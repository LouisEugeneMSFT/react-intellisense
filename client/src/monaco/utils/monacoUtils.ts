// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Monaco } from '@monaco-editor/react';
import {
  CloseAction,
  createConnection,
  ErrorAction,
  LanguageClientOptions,
  MonacoLanguageClient,
} from 'monaco-languageclient';
import { MessageConnection } from 'vscode-ws-jsonrpc';

export function registerLanguage(monaco: Monaco, languageName: string) {
  // return if we've already registered this language to the editor
  if (monaco.languages.getLanguages().some((lang) => lang.id === languageName))
    return;

  monaco.languages.register({
    id: languageName,
  });
}

export function createLanguageClient(
  name: string,
  documentSelector: LanguageClientOptions['documentSelector'],
  connection: MessageConnection
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name,
    clientOptions: {
      // use a language id as a document selector
      documentSelector,
      // disable the default error handler
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart,
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        return Promise.resolve(
          createConnection(connection, errorHandler, closeHandler)
        );
      },
    },
  });
}

export async function sendRequestWithRetry(
  languageClient: MonacoLanguageClient,
  method: string,
  data: any,
  interval = 1000
) {
  let sendTimer;

  const send = (data) => {
    try {
      languageClient.sendRequest(method, data);
      if (sendTimer) clearInterval(sendTimer);
    } catch (error) {
      sendTimer = setTimeout(() => {
        send(data);
      }, interval);
    }
  };
  if (languageClient) {
    await languageClient.onReady();
    send(data);
  }
}
