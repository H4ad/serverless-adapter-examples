import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { GCPHandler } from '@h4ad/serverless-adapter/lib/handlers/gcp';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { appRouter, frameworkOptions, TrpcContext } from './setup';

const framework = new TrpcFramework<TrpcContext>(frameworkOptions);
const corsFramework = new CorsFramework(framework);
const functionName = 'helloWorld';

ServerlessAdapter.new(appRouter)
  .setFramework(corsFramework)
  .setHandler(new GCPHandler(functionName))
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
