import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HuaweiApiGatewayAdapter } from '@h4ad/serverless-adapter/lib/adapters/huawei';
import { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { CallbackResolver } from '@h4ad/serverless-adapter/lib/resolvers/callback';
import { createApp } from '../core/setup';

const app = createApp();

export const handler = ServerlessAdapter.new(app)
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setHandler(new DefaultHandler())
  .setFramework(new FastifyFramework())
  .setResolver(new CallbackResolver())
  .addAdapter(new HuaweiApiGatewayAdapter())
  .build();
