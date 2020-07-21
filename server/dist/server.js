"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const vscode_languageserver_1 = require("vscode-languageserver");
const rpc = require("vscode-ws-jsonrpc");
const ws = require("ws");
const intellisenseServer_1 = require("./intellisenseServer");
const variables_1 = require("./resolvers/variables");
const serverUtils_1 = require("./utils/serverUtils");
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);
app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});
const wss = new ws.Server({
    noServer: true,
});
const launchIntellisenseLanguageServer = (socket) => {
    const reader = new rpc.WebSocketMessageReader(socket);
    const writer = new rpc.WebSocketMessageWriter(socket);
    const connection = vscode_languageserver_1.createConnection(reader, writer);
    const variablesResolver = variables_1.getVariablesResolver(app);
    const server = new intellisenseServer_1.IntellisenseServer(connection, variablesResolver);
    server.start();
};
serverUtils_1.attachLSPServer(wss, server, '/intellisense-language-server', (webSocket) => {
    if (webSocket.readyState === webSocket.OPEN) {
        launchIntellisenseLanguageServer(webSocket);
    }
    else {
        webSocket.on('open', () => {
            launchIntellisenseLanguageServer(webSocket);
        });
    }
});
//# sourceMappingURL=server.js.map