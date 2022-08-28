import { HttpKernel } from '@deepkit/http';
import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HuaweiApiGatewayAdapter } from '@h4ad/serverless-adapter/lib/adapters/huawei';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { CallbackResolver } from '@h4ad/serverless-adapter/lib/resolvers/callback';
import { createApp } from './setup';

const app = createApp();
const httpKernel = app.get(HttpKernel);

export const handler = ServerlessAdapter.new(httpKernel)
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setHandler(new DefaultHandler())
  .setFramework(new HttpDeepkitFramework())
  .setResolver(new CallbackResolver())
  .addAdapter(new HuaweiApiGatewayAdapter())
  .build();
