import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpTriggerV4Adapter } from '@h4ad/serverless-adapter/lib/adapters/azure';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { AzureHandler } from '@h4ad/serverless-adapter/lib/handlers/azure';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';

const app = require('express')();

app.get('*', (req, res) => {
  res.json({ success: true });
});

export default ServerlessAdapter.new(app)
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setHandler(new AzureHandler({ useContextLogWhenInternalLogger: true }))
  .setFramework(new ExpressFramework())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpTriggerV4Adapter())
  .build();
