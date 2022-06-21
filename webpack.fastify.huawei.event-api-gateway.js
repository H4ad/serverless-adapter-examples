const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/fastify/huawei/event-api-gateway.entry.ts'
}, defaultConfig);
