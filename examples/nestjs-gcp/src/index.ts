import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { GCPHandler } from '@h4ad/serverless-adapter/lib/handlers/gcp';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();

  await app.init();

  return app.getHttpAdapter().getInstance();
}

// to add support for fastify, just change this to FastifyFramework
const express = new ExpressFramework();
const framework = new LazyFramework(express, bootstrap);
const functionName = 'helloWorld';

ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new GCPHandler(functionName))
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
