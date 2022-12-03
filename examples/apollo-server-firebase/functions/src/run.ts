import { startStandaloneServer } from '@apollo/server/standalone';
import { app } from './setup';

startStandaloneServer(app, {
  context: null as any,
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${ url }`);
});
