// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ReconnectingWebSocket from 'reconnecting-websocket';

export function createWebSocket(url: string): any {
  const socketOptions = {
    constructor: WebSocket,
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: 500,
    debug: false,
  };

  return new ReconnectingWebSocket(url, [], socketOptions);
}
