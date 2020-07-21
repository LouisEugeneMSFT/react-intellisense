"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopesResolver = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
exports.scopesResolver = () => {
    return [
        {
            label: 'user.',
            kind: vscode_languageserver_1.CompletionItemKind.Enum,
            insertText: 'user.',
            documentation: 'user is associated with a specific user. Properties in the user scope are retained forever.',
        },
        {
            label: 'conversation.',
            kind: vscode_languageserver_1.CompletionItemKind.Enum,
            insertText: 'conversation.',
            documentation: 'conversation is associated with the conversation id. Properties in the conversation scope are retained forever and may be accessed by multiple users within the same conversation (for example, multiple users together in a Microsoft Teams channel).',
        },
        {
            label: 'dialog.',
            kind: vscode_languageserver_1.CompletionItemKind.Enum,
            insertText: 'dialog.',
            documentation: 'dialog is associated with the active dialog and any child or parent dialogs. Properties in the dialog scope are retained until the last active dialog ends.',
        },
        {
            label: 'turn.',
            kind: vscode_languageserver_1.CompletionItemKind.Enum,
            insertText: 'turn.',
            documentation: 'turn is associated with a single turn. You can also think of this as the bot handling a single message from the user. Properties in the turn scope are discarded at the end of the turn.',
        },
    ];
};
//# sourceMappingURL=scopes.js.map