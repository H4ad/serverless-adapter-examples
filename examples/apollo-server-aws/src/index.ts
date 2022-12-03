import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApolloServerMutationAdapter } from '@h4ad/serverless-adapter/lib/adapters/apollo-server';
import { ApiGatewayV2Adapter, SNSAdapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { app } from './setup';

const framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();
const jsonBodyFramework = new JsonBodyParserFramework(framework);

// optional: you can configure cors using this guy here, if you don't want, just erase
const corsFramework = new CorsFramework(jsonBodyFramework, {
  origin: '*',
  maxAge: 30,
});

// needed to start the application, without this, the apollo server will throw an error
app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

// let's add support for api gateway v2
const apiGatewayV2Adapter = new ApiGatewayV2Adapter();

// let's add support for sqs
const sqsAdapter = new SQSAdapter();
const wrappedSqsAdapter = new ApolloServerMutationAdapter(
  sqsAdapter,
  {
    mutationName: 'sqs', // remember the scheme? This is the name of the mutation
    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type
    // if we dont specify nothing, `{ __typename }` will be returned.
  }
);

// let's add support for sns
const snsAdapter = new SNSAdapter();
const wrappedSnsAdapter = new ApolloServerMutationAdapter(
  snsAdapter,
  {
    mutationName: 'sns', // remember the scheme? This is the name of the mutation
    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type
    // if we dont specify nothing, `{ __typename }` will be returned.
  }
);

export const handler = ServerlessAdapter.new(app)
  .setFramework(corsFramework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(apiGatewayV2Adapter)
  .addAdapter(wrappedSqsAdapter)
  .addAdapter(wrappedSnsAdapter)
  .build();
