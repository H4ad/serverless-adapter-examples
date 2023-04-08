import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { AwsStreamHandler } from '@h4ad/serverless-adapter/lib/handlers/aws';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy/index.js';
import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();

  await app.init();

  return app.getHttpAdapter().getInstance();
}

// to add support for fastify, just change this to FastifyFramework
const express = new ExpressFramework();
const framework = new LazyFramework(express, bootstrap);

export const handler = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new AwsStreamHandler())
  .setResolver(new DummyResolver())
  // disable debug mode to not produce too much logs
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new SQSAdapter())
  .build();
