import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpFunctionAdapter } from '@h4ad/serverless-adapter/lib/adapters/digital-ocean';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DigitalOceanHandler } from '@h4ad/serverless-adapter/lib/handlers/digital-ocean/digital-ocean.handler';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { appRouter, frameworkOptions, TrpcContext } from './setup';

const framework = new TrpcFramework<TrpcContext>(frameworkOptions);
const jsonFramework = new JsonBodyParserFramework(framework);

export const main = ServerlessAdapter.new(appRouter)
  .setFramework(jsonFramework)
  .setHandler(new DigitalOceanHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpFunctionAdapter())
  .build();
