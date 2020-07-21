"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletionString = exports.getRangeAtPosition = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
exports.getRangeAtPosition = (document, position) => {
    const text = document.getText();
    const line = position.line;
    const pos = position.character;
    const lineText = text.split('\n')[line];
    let match;
    const wordDefinition = /[a-zA-Z0-9_/.-]+/g;
    while ((match = wordDefinition.exec(lineText))) {
        const matchIndex = match.index || 0;
        if (matchIndex > pos) {
            return undefined;
        }
        else if (wordDefinition.lastIndex >= pos) {
            return vscode_languageserver_1.Range.create(line, matchIndex, line, wordDefinition.lastIndex);
        }
    }
    return undefined;
};
exports.getCompletionString = (currentWord, completionLabel) => {
    const currentWordArray = currentWord.split('.');
    const completionLabelArray = completionLabel.split('.');
    const completionArray = completionLabelArray.slice(currentWordArray.length - 1);
    const completionString = completionArray.join('.');
    return completionString;
};
//# sourceMappingURL=intellisenseServerUtils.js.map