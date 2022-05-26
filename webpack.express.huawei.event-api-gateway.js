const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/express/huawei/event-api-gateway.entry.ts'
}, defaultConfig);
