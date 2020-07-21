const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config) {
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['json']
  }));

  config.resolve =  { ...config.resolve, alias: { 'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility') } }

  return config;
}