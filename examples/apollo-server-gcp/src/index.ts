import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy/index.js';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server/index.js';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser/index.js';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors/index.js';
import { GCPHandler } from '@h4ad/serverless-adapter/lib/handlers/gcp/index.js';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy/index.js';
import { app } from './setup';

const functionName = 'helloWorld';
const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();
const jsonBodyFramework = new JsonBodyParserFramework(framework);

// optional: you can configure cors using this guy here, if you don't want, just erase
const corsFramework = new CorsFramework(jsonBodyFramework, {
  origin: '*',
  maxAge: 30,
});

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

ServerlessAdapter.new(app)
  .setFramework(corsFramework)
  .setHandler(new GCPHandler(functionName))
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();
