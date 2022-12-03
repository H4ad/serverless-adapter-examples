import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpFunctionAdapter } from '@h4ad/serverless-adapter/lib/adapters/digital-ocean';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { DigitalOceanHandler } from '@h4ad/serverless-adapter/lib/handlers/digital-ocean';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { app } from './setup';

const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();
const jsonBodyFramework = new JsonBodyParserFramework(framework);

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export const main = ServerlessAdapter.new(app)
  .setFramework(jsonBodyFramework)
  .setHandler(new DigitalOceanHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpFunctionAdapter())
  .build();
