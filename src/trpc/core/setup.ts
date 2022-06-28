import { BufferToJSObjectTransformer } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { TrpcMetricController } from './controllers/trpc-metric.controller';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

import * as trpc from '@trpc/server';
import { TrpcContext } from './router';

export const createApp = () => {
  let app = trpc.router<TrpcContext>()
    .transformer(new BufferToJSObjectTransformer())

  app = new TrpcMetricController().getRoutes(app);

  app.query('/', { resolve: () => '<h1>Sample in Fastify Project</h1>' });

  return app;
};

