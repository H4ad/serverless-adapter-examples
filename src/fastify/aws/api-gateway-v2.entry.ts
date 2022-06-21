import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from '../core/setup';

export const handler = ServerlessAdapter.new(createApp())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(new FastifyFramework())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
