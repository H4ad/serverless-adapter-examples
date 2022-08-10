import { HttpKernel } from '@deepkit/http';
import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from './setup';

const app = createApp();
const httpKernel = app.get(HttpKernel);

export const handler = ServerlessAdapter.new(httpKernel)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(new HttpDeepkitFramework())
  .setLogger(createDefaultLogger())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
