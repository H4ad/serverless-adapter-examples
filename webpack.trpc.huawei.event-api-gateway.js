const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/trpc/huawei/event-api-gateway.entry.ts'
}, defaultConfig);
