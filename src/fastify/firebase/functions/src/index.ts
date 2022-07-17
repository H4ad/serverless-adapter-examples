import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import * as fastify from 'fastify';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = fastify.fastify();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/item', (req, res) => {
  res.send({
    success: true,
  });
});

app.post('/item', (req, res) => {
  res.send(req.body);
});

// this is a fix explained in:
// https://www.fastify.io/docs/latest/Guides/Serverless/#add-custom-contenttypeparser-to-fastify-instance]
// is necessary to be able to receive post requests
app.addContentTypeParser('application/json', {}, (req, body, done) => {
  // @ts-ignore
  done(null, body.body);
});

const handler = ServerlessAdapter.new(app)
  .setHandler(new HttpFirebaseHandler())
  .setFramework(new FastifyFramework())
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();

/**
 * You can export multiple times if you want
 */

export const helloWorld = handler;
export const test = handler;
