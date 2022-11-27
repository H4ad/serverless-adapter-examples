import { HttpKernel } from '@deepkit/http';
import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { createApp } from './setup';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';

const app = createApp();
const httpKernel = app.get(HttpKernel);
const framework = new HttpDeepkitFramework();
const corsFramework = new CorsFramework(framework);

export const handler = ServerlessAdapter.new(httpKernel)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(corsFramework)
  .setLogger(createDefaultLogger())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
