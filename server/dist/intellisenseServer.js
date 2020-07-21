"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntellisenseServer = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const expressions_1 = require("./resolvers/expressions");
const scopes_1 = require("./resolvers/scopes");
const intellisenseServerUtils_1 = require("./utils/intellisenseServerUtils");
const Fuse = require('fuse.js');
class IntellisenseServer {
    constructor(connection, memoryResolver) {
        this.connection = connection;
        this.memoryResolver = memoryResolver;
        this.documents = new vscode_languageserver_1.TextDocuments();
        this.initialize = (params) => {
            var _a;
            this.scopes = (_a = params.initializationOptions) === null || _a === void 0 ? void 0 : _a.scopes;
            return {
                capabilities: {
                    completionProvider: {
                        resolveProvider: true,
                    },
                },
            };
        };
        this.changeConfiguration = (params) => {
            this.scopes = params.settings.scopes;
        };
        this.documents.listen(connection);
        this.connection.onInitialize((params) => this.initialize(params));
        this.connection.onDidChangeConfiguration((params) => this.changeConfiguration(params));
        this.connection.onCompletion((params) => __awaiter(this, void 0, void 0, function* () { return this.completion(params); }));
    }
    start() {
        this.connection.listen();
    }
    completion(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this.documents.get(params.textDocument.uri);
            if (document) {
                const range = intellisenseServerUtils_1.getRangeAtPosition(document, params.position);
                const wordAtCurRange = document.getText(range);
                if (wordAtCurRange && wordAtCurRange !== '') {
                    const completionItems = this.getCompletionItems();
                    const fuseOptions = {
                        includeScore: true,
                        threshold: 0.2,
                        includeMatches: true,
                        keys: ['label'],
                    };
                    const fuse = new Fuse(completionItems, fuseOptions);
                    const fuseSearchResults = fuse.search(wordAtCurRange);
                    const results = fuseSearchResults.map((result) => {
                        const completionString = intellisenseServerUtils_1.getCompletionString(wordAtCurRange, result.item.label);
                        const returnedResult = Object.assign(Object.assign({}, result.item), { completion: completionString, data: { matches: result.matches, range: range } });
                        return returnedResult;
                    });
                    return Promise.resolve({
                        isIncomplete: false,
                        items: results,
                    });
                }
            }
            return Promise.resolve(null);
        });
    }
    getCompletionItems() {
        let completionItems = [];
        if (!this.scopes || this.scopes.includes('variables')) {
            completionItems = completionItems.concat(this.memoryResolver());
        }
        if (!this.scopes || this.scopes.includes('expressions')) {
            completionItems = completionItems.concat(expressions_1.expressionsResolver());
        }
        if (!this.scopes || this.scopes.includes('scopes')) {
            completionItems = completionItems.concat(scopes_1.scopesResolver());
        }
        return completionItems;
    }
}
exports.IntellisenseServer = IntellisenseServer;
//# sourceMappingURL=intellisenseServer.js.map