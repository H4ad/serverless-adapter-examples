import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpTriggerV4Adapter } from '@h4ad/serverless-adapter/lib/adapters/azure';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { AzureHandler } from '@h4ad/serverless-adapter/lib/handlers/azure';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { app } from './setup';

const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();
const jsonBodyFramework = new JsonBodyParserFramework(framework);

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export const handler = ServerlessAdapter.new(app)
  .setFramework(jsonBodyFramework)
  .setHandler(new AzureHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpTriggerV4Adapter({ stripBasePath: '/api' }))
  .build();
