// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CompletionParams,
  DidChangeConfigurationParams,
  IConnection,
  InitializeParams,
  TextDocuments,
} from 'vscode-languageserver';
import { CompletionItem, CompletionList } from 'vscode-languageserver-types';
import { expressionsResolver } from './resolvers/expressions';
import { scopesResolver } from './resolvers/scopes';
import {
  getCompletionString,
  getRangeAtPosition,
} from './utils/intellisenseServerUtils';
const Fuse = require('fuse.js');

type FuseResult<T> = {
  item: T;
  matches: { indices: number[][]; value: string; key: string }[];
};

export class IntellisenseServer {
  protected readonly documents = new TextDocuments();
  protected scopes: string[] | undefined;

  constructor(
    protected readonly connection: IConnection,
    protected readonly memoryResolver: () => CompletionItem[]
  ) {
    this.documents.listen(connection);
    this.connection.onInitialize((params) => this.initialize(params));
    this.connection.onDidChangeConfiguration((params) =>
      this.changeConfiguration(params)
    );
    this.connection.onCompletion(async (params) => this.completion(params));
  }

  start() {
    this.connection.listen();
  }

  protected initialize = (params: InitializeParams) => {
    this.scopes = params.initializationOptions?.scopes;
    return {
      capabilities: {
        completionProvider: {
          resolveProvider: true,
        },
      },
    };
  };

  protected changeConfiguration = (params: DidChangeConfigurationParams) => {
    this.scopes = params.settings.scopes;
  };

  protected async completion(
    params: CompletionParams
  ): Promise<CompletionList | null> {
    const document = this.documents.get(params.textDocument.uri);

    if (document) {
      const range = getRangeAtPosition(document, params.position);
      const wordAtCurRange = document.getText(range);

      if (wordAtCurRange && wordAtCurRange !== '') {
        const completionItems = this.getCompletionItems();

        const fuseOptions = {
          includeScore: true,
          threshold: 0.2,
          includeMatches: true,
          keys: ['label'],
        };
        const fuse = new Fuse(completionItems, fuseOptions);
        const fuseSearchResults = fuse.search(wordAtCurRange);

        const results: CompletionItem[] = fuseSearchResults.map(
          (result: FuseResult<CompletionItem>) => {
            const completionString = getCompletionString(
              wordAtCurRange,
              result.item.label
            );

            const returnedResult = {
              ...result.item,
              completion: completionString,
              data: { matches: result.matches, range: range },
            };

            return returnedResult;
          }
        );

        return Promise.resolve({
          isIncomplete: false,
          items: results,
        });
      }
    }

    return Promise.resolve(null);
  }

  protected getCompletionItems(): CompletionItem[] {
    let completionItems: CompletionItem[] = [];

    if (!this.scopes || this.scopes.includes('variables')) {
      completionItems = completionItems.concat(this.memoryResolver());
    }
    if (!this.scopes || this.scopes.includes('expressions')) {
      completionItems = completionItems.concat(expressionsResolver());
    }
    if (!this.scopes || this.scopes.includes('scopes')) {
      completionItems = completionItems.concat(scopesResolver());
    }

    return completionItems;
  }
}
