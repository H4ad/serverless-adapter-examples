import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { appRouter, frameworkOptions, TrpcContext } from './setup';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';

const framework = new TrpcFramework<TrpcContext>(frameworkOptions);
const jsonFramework = new JsonBodyParserFramework(framework);
const corsFramework = new CorsFramework(jsonFramework);

export const handler = ServerlessAdapter.new(appRouter)
  .setFramework(corsFramework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new SQSAdapter())
  .build();
