// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Editor, { monaco } from '@monaco-editor/react';
import { MonacoServices } from 'monaco-languageclient';
import {
  createLanguageClient,
  registerLanguage,
} from 'monaco/utils/monacoUtils';
import { createWebSocket } from 'monaco/utils/socketsUtils';
import React from 'react';
import { listen, MessageConnection } from 'vscode-ws-jsonrpc';

declare global {
  interface Window {
    monacoServiceInstance: MonacoServices;
  }
}

const LANGUAGE_NAME = 'intellisense';

const options = {
  quickSuggestions: true,
  wordBasedSuggestions: true,
};

function MonacoEditor(props) {
  const { url, value, onChange } = props;
  const [editor, setEditor] = React.useState<any>();

  React.useEffect(() => {
    if (!editor) return;

    if (!window.monacoServiceInstance) {
      window.monacoServiceInstance = MonacoServices.install(editor as any);
    }

    const webSocket: WebSocket = createWebSocket(url);

    listen({
      webSocket,
      onConnection: (connection: MessageConnection) => {
        const languageClient = createLanguageClient(
          'Intellisense Language Client',
          [LANGUAGE_NAME],
          connection
        );
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      },
    });
  }, [editor]);

  React.useEffect(() => {
    if (editor) {
      const disposable = editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      return () => {
        disposable.dispose();
      };
    }
  }, [onChange, editor]);

  React.useEffect(() => {
    monaco.init().then((instance) => {
      registerLanguage(instance, LANGUAGE_NAME);
    });
  }, []);

  const editorDidMount = (_getValue, editor) => {
    setEditor(editor);
  };

  return (
    <>
      <Editor
        height="100px"
        width="300px"
        language={LANGUAGE_NAME}
        theme="vs-dark"
        value={value}
        editorDidMount={editorDidMount}
        options={options}
      />
    </>
  );
}

export default MonacoEditor;
