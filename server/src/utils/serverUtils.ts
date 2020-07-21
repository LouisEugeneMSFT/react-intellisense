// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as http from 'http';
import * as net from 'net';
import * as url from 'url';
import * as rpc from 'vscode-ws-jsonrpc';
import * as ws from 'ws';

export function createSocketHandler(webSocket): rpc.IWebSocket {
  const socket: rpc.IWebSocket = {
    send: (content) => webSocket.send(content),
    onMessage: (cb) => webSocket.on('message', cb),
    onError: (cb) => webSocket.on('error', cb),
    onClose: (cb) => webSocket.on('close', cb),
    dispose: () => webSocket.close(),
  };
  return socket;
}

export function attachLSPServer(
  wss: ws.Server,
  server: http.Server,
  path: string,
  handler: (webSocket) => void
) {
  server.on(
    'upgrade',
    (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
      const pathname = request.url
        ? url.parse(request.url).pathname
        : undefined;
      if (pathname === path) {
        wss.handleUpgrade(request, socket, head, (webSocket) => {
          handler(createSocketHandler(webSocket));
        });
      }
    }
  );
}
