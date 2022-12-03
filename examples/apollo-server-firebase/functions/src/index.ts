import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { app } from './setup';

const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();

// optional: you can configure cors using this guy here, if you don't want, just erase
const corsFramework = new CorsFramework(framework, {
  origin: '*',
  maxAge: 30,
});

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export const main = ServerlessAdapter.new(app)
  .setFramework(corsFramework)
  .setHandler(new HttpFirebaseHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new DummyAdapter())
  .build();
