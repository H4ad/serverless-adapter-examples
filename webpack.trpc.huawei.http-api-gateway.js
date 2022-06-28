const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/trpc/huawei/http-api-gateway.entry.ts'
}, defaultConfig);
