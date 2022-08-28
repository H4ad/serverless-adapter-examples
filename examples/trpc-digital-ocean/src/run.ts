import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter, frameworkOptions } from './setup';

const { listen } = createHTTPServer({
  router: appRouter,
  ...frameworkOptions,
});

const port = +(process.env.PORT || 0) || 3000;

listen(port);

console.log(`tRPC started in http://localhost:${ port }`);
