import { ApolloServer } from '@apollo/server';
import type { DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';

const schema = `
  type Query { message: String } 
`;
export const app = new ApolloServer<DefaultServerlessApolloServerContext>({
  typeDefs: schema,
  resolvers: {
    Query: {
      message: () => 'Hello World!',
    },
  },
});
