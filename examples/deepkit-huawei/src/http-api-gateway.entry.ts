import { HttpKernel } from '@deepkit/http';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { HttpHuaweiHandler } from '@h4ad/serverless-adapter/lib/handlers/huawei';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy/dummy.resolver';
import { createApp } from './setup';

const app = createApp();
const httpKernel = app.get(HttpKernel);

const dispose = ServerlessAdapter.new(httpKernel)
  .setHandler(new HttpHuaweiHandler())
  .setFramework(new HttpDeepkitFramework())
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
