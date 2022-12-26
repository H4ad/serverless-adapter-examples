import { startStandaloneServer } from '@apollo/server/standalone';
import { app } from './setup';

startStandaloneServer(app, {
  context: null,
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${ url }`);
});
