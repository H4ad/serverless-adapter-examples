import { ApolloServer } from '@apollo/server';
import type { DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import type { SNSEvent, SQSEvent } from 'aws-lambda';
import { GraphQLError } from 'graphql/error/GraphQLError';

const schema = `
type Query { message: String } 

type AWSResult {
  result: String
}

type Mutation { 
  sqs (event: String): AWSResult
  sns (event: String): AWSResult
}`;

export const app = new ApolloServer<DefaultServerlessApolloServerContext>({
  typeDefs: schema,
  resolvers: {
    Query: {
      message: () => 'Hello World!',
    },
    Mutation: {
      sqs: (_, data, context) => {
        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security
        if (context.request.headers['host'] !== 'sqs.amazonaws.com')
          throw new GraphQLError('Your host is not allowed to call this mutation.');

        // here, you can manipulate the event data and do whatever you want with it.
        const event = JSON.parse(data.event) as SQSEvent;

        // I will just return the event data to better debugging
        return ({
          result: JSON.stringify(event),
        });
      },
      sns: (_, data, context) => {
        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security
        if (context.request.headers['host'] !== 'sns.amazonaws.com')
          throw new GraphQLError('Your host is not allowed to call this mutation.');

        // here, you can manipulate the event data and do whatever you want with it.
        const event = JSON.parse(data.event) as SNSEvent;

        // I will just return the event data to better debugging
        return ({
          result: JSON.stringify(event),
        });
      },
    },
  },
});
