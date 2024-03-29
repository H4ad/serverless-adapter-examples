import { HttpKernel } from '@deepkit/http';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { createApp } from './setup';

const app = createApp();
const httpKernel = app.get(HttpKernel);

const jsonFramework = new JsonBodyParserFramework(
  new HttpDeepkitFramework(),
);

const handler = ServerlessAdapter.new(httpKernel)
  .setHandler(new HttpFirebaseHandler())
  .setFramework(jsonFramework)
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();

/**
 * You can export multiple times if you want
 */

export const helloWorld = handler;
export const test = handler;
