const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/trpc/aws/api-gateway-v2.entry.ts'
}, defaultConfig);
