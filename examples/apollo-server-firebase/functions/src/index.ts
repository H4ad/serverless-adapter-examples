import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { app } from './setup';

const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();
const jsonFramework = new JsonBodyParserFramework(framework)

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export const main = ServerlessAdapter.new(app)
  .setFramework(jsonFramework)
  .setHandler(new HttpFirebaseHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new DummyAdapter())
  .build();
