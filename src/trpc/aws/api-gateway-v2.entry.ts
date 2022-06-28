import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from '../core/setup';

const app = createApp();

export const handler = ServerlessAdapter.new(app)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(new TrpcFramework())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
