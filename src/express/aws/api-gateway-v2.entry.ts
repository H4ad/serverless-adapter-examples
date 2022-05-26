import { ServerlessAdapter, ServerlessHandler } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { Express } from 'express';
import { createApp } from '../core/setup';

let resolver: Promise<any> = Promise.resolve();
let cachedHandler;

function createHandler(app: Express): ServerlessHandler<any> {
  const adapter = ServerlessAdapter.new(app)
    .setHandler(new DefaultHandler())
    .setResolver(new PromiseResolver())
    .setFramework(new ExpressFramework())
    .addAdapter(new ApiGatewayV2Adapter());

  return adapter.build();
}

async function bootstrapServer() {
  if (!cachedHandler) {
    cachedHandler = await createHandler(createApp());
  }

  return cachedHandler;
}

resolver = resolver.then(() => bootstrapServer());

const handler = (...params) => {
  return resolver.then(() => cachedHandler(...params));
};

export { handler };
