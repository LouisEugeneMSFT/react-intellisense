"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachLSPServer = exports.createSocketHandler = void 0;
const url = require("url");
function createSocketHandler(webSocket) {
    const socket = {
        send: (content) => webSocket.send(content),
        onMessage: (cb) => webSocket.on('message', cb),
        onError: (cb) => webSocket.on('error', cb),
        onClose: (cb) => webSocket.on('close', cb),
        dispose: () => webSocket.close(),
    };
    return socket;
}
exports.createSocketHandler = createSocketHandler;
function attachLSPServer(wss, server, path, handler) {
    server.on('upgrade', (request, socket, head) => {
        const pathname = request.url
            ? url.parse(request.url).pathname
            : undefined;
        if (pathname === path) {
            wss.handleUpgrade(request, socket, head, (webSocket) => {
                handler(createSocketHandler(webSocket));
            });
        }
    });
}
exports.attachLSPServer = attachLSPServer;
//# sourceMappingURL=serverUtils.js.map