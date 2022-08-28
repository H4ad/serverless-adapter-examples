import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { appRouter, frameworkOptions, TrpcContext } from './setup';

const framework = new TrpcFramework<TrpcContext>(frameworkOptions);

export const handler = ServerlessAdapter.new(appRouter)
  .setFramework(framework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new SQSAdapter())
  .build();
