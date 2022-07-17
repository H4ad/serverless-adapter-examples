import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import * as express from 'express';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = express();

app.get('*', (req, res) => {
  res.json({
    success: true,
  });
});

const handler = ServerlessAdapter.new(app)
  .setHandler(new HttpFirebaseHandler())
  .setFramework(new ExpressFramework())
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();

/**
 * You can export multiple times if you want
 */

export const helloWorld = handler;
export const test = handler;
