import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';
import { HttpHuaweiHandler } from '@h4ad/serverless-adapter/lib/handlers/huawei';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy/dummy.resolver';
import { createApp } from '../core/setup';

const app = createApp();

const dispose = ServerlessAdapter.new(app)
  .setHandler(new HttpHuaweiHandler())
  .setFramework(new FastifyFramework())
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
