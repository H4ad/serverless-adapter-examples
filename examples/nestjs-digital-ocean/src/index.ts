import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpFunctionAdapter } from '@h4ad/serverless-adapter/lib/adapters/digital-ocean';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { DigitalOceanHandler } from '@h4ad/serverless-adapter/lib/handlers/digital-ocean';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();

  await app.init();

  return app.getHttpAdapter().getInstance();
}

// to add support for fastify, just change this to FastifyFramework
const express = new ExpressFramework();
const framework = new LazyFramework(express, bootstrap);

export const main = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new DigitalOceanHandler())
  .setResolver(new PromiseResolver())
  .setLogger(createDefaultLogger({ level: 'warn' }))
  .addAdapter(new HttpFunctionAdapter())
  .build();
