import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { GCPHandler } from '@h4ad/serverless-adapter/lib/handlers/gcp';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { appRouter, frameworkOptions, TrpcContext } from './setup';

const framework = new TrpcFramework<TrpcContext>(frameworkOptions);
const jsonFramework = new JsonBodyParserFramework(framework);
const corsFramework = new CorsFramework(jsonFramework);
const functionName = 'helloWorld';

ServerlessAdapter.new(appRouter)
  .setFramework(corsFramework)
  .setHandler(new GCPHandler(functionName))
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
