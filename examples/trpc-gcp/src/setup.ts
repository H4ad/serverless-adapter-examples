import { BufferToJSObjectTransformer, TrpcAdapterContext, TrpcFrameworkOptions } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export type CustomContext = { currentDate: Date };
export type TrpcContext = TrpcAdapterContext<CustomContext>;

export const appRouter = trpc
  .router<TrpcContext>()
  .transformer(new BufferToJSObjectTransformer())
  .query('getUser', {
    async resolve() {
      return { name: 'Bilbo' };
    },
  })
  .mutation('createUser', {
    input: z.object({ name: z.string().min(5) }),
    async resolve({ input }) {
      return {
        created: true,
        newName: input.name,
      };
    },
  })
  .mutation('testUser', {
    input: z.object({ name: z.string().min(5) }),
    async resolve({ input, ctx }) {
      console.log(ctx.getUrl());
      console.log(ctx.getIp());
      console.log(ctx.getMethod());
      console.log(ctx.getHeaders());

      return {
        created: true,
        newName: input.name,
      };
    },
  });

export const frameworkOptions: TrpcFrameworkOptions<TrpcContext> = {
  createContext: () => ({ currentDate: new Date() }),
};
