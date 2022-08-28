import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DigitalOceanHttpEvent } from '@h4ad/serverless-adapter/lib/@types/digital-ocean';
import { HttpFunctionAdapter } from '@h4ad/serverless-adapter/lib/adapters/digital-ocean';
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

const handler = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setLogger(createDefaultLogger({ level: 'verbose' }))
  .addAdapter(new HttpFunctionAdapter())
  .build();

export async function main(event: DigitalOceanHttpEvent) {
  console.log(event);

  return handler(event).then(result => {
    console.log(result);

    return result;
  });
}
