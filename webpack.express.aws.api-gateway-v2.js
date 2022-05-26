const defaultConfig = require('./webpack.base');

module.exports = Object.assign({
  entry: './src/express/aws/api-gateway-v2.entry.ts'
}, defaultConfig);
