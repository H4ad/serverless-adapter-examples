import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import { BufferToJSObjectTransformer, TrpcAdapterContext, TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import * as trpc from '@trpc/server';
import { z } from 'zod';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

type TrpcContext = TrpcAdapterContext<{ potato: boolean }>;

const app = trpc.router<TrpcContext>()
  .transformer(new BufferToJSObjectTransformer())
  .mutation('item', {
    input: z.object({
      name: z.string(),
      value: z.string(),
    }),
    resolve: ({ input, ctx }) => ({
      ...input,
    }),
  })
  .query('item', { resolve: () => 'Sample in tRPC Project' });

const handler = ServerlessAdapter.new(app)
  .setHandler(new HttpFirebaseHandler())
  .setFramework(new TrpcFramework())
  .setResolver(new DummyResolver())
  .addAdapter(new DummyAdapter())
  .build();

/**
 * You can export multiple times if you want
 */

export const helloWorld = handler;
export const test = handler;
