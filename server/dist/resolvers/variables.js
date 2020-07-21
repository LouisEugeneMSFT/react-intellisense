"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariablesResolver = void 0;
const bodyParser = require("body-parser");
const vscode_languageserver_1 = require("vscode-languageserver");
const jsonParser = bodyParser.json();
let variables = [];
exports.getVariablesResolver = (app) => {
    app.post('/setvariables', jsonParser, function (req, res) {
        variables = req.body.list;
        res.sendStatus(200);
    });
    const memoryResolver = () => {
        return variables.map((variable) => ({
            label: variable,
            kind: vscode_languageserver_1.CompletionItemKind.Variable,
            insertText: variable,
            documentation: '',
        }));
    };
    return memoryResolver;
};
//# sourceMappingURL=variables.js.map