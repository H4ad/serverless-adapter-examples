import { TrpcAdapterContext, TrpcFrameworkOptions } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { SQSEvent } from 'aws-lambda';
import { z } from 'zod';

export type CustomContext = { currentDate: Date };
export type TrpcContext = TrpcAdapterContext<CustomContext>;

export const appRouter = trpc
  .router<TrpcContext>()
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
  })
  .mutation('sqs', {
    input: z.object({
      Records: z.array(z.any()),
    }),
    async resolve({ input, ctx }) {
      if (ctx.getHeader('host') !== 'sqs.amazonaws.com')
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Wrong host.',
        });

      const event = input as SQSEvent;

      console.log(event);
    },
  });

export const frameworkOptions: TrpcFrameworkOptions<TrpcContext> = {
  createContext: () => ({ currentDate: new Date() }),
};
