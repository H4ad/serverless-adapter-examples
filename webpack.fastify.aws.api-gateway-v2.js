const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/fastify/aws/api-gateway-v2.entry.ts'
}, defaultConfig);
