import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV1Adapter, ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();

  await app.init();

  return app.getHttpAdapter().getInstance();
}

const express = new ExpressFramework();
const framework = new LazyFramework(express, bootstrap);

export const handler = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setLogger(createDefaultLogger({ level: 'warn' }))
  .addAdapter(new ApiGatewayV1Adapter())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
