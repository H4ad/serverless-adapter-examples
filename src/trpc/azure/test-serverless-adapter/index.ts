import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpTriggerV4Adapter } from '@h4ad/serverless-adapter/lib/adapters/azure';
import { BufferToJSObjectTransformer, TrpcAdapterContext, TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { AzureHandler } from '@h4ad/serverless-adapter/lib/handlers/azure';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import * as trpc from '@trpc/server';
import { z } from 'zod';

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

export default ServerlessAdapter.new(app)
  .setLogger(createDefaultLogger({ level: 'debug' }))
  .setHandler(new AzureHandler({ useContextLogWhenInternalLogger: true }))
  .setFramework(new TrpcFramework())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpTriggerV4Adapter({ stripBasePath: '/api' }))
  .build();
