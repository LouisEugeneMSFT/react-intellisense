// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as express from 'express';
import * as path from 'path';
import { createConnection, IConnection } from 'vscode-languageserver';
import * as rpc from 'vscode-ws-jsonrpc';
import * as ws from 'ws';
import { IntellisenseServer } from './intellisenseServer';
import { getVariablesResolver } from './resolvers/variables';
import { attachLSPServer } from './utils/serverUtils';

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const wss: ws.Server = new ws.Server({
  noServer: true,
});

const launchIntellisenseLanguageServer = (socket: rpc.IWebSocket) => {
  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);
  const connection: IConnection = createConnection(reader, writer);
  const variablesResolver = getVariablesResolver(app);
  const server = new IntellisenseServer(connection, variablesResolver);
  server.start();
};

attachLSPServer(wss, server, '/intellisense-language-server', (webSocket) => {
  if (webSocket.readyState === webSocket.OPEN) {
    launchIntellisenseLanguageServer(webSocket);
  } else {
    webSocket.on('open', () => {
      launchIntellisenseLanguageServer(webSocket);
    });
  }
});
