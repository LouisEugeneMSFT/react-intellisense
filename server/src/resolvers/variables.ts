// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { CompletionItem, CompletionItemKind } from 'vscode-languageserver';

const jsonParser = bodyParser.json();

let variables: string[] = [];

export const getVariablesResolver = (app: Application) => {
  app.post('/setvariables', jsonParser, function (req, res) {
    variables = req.body.list;
    res.sendStatus(200);
  });

  const memoryResolver = (): CompletionItem[] => {
    return variables.map((variable) => ({
      label: variable,
      kind: CompletionItemKind.Variable,
      insertText: variable,
      documentation: '',
    }));
  };

  return memoryResolver;
};
