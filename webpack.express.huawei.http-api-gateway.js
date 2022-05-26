const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/express/huawei/http-api-gateway.entry.ts'
}, defaultConfig);
