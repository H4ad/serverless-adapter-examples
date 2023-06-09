import { TrpcAdapterContext, TrpcFrameworkOptions } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export type CustomContext = { currentDate: Date };
export type TrpcContext = TrpcAdapterContext<CustomContext>;

const t = trpc.initTRPC.context<TrpcContext>().create();

export const appRouter = t.router({
  getUser: t.procedure.query(() => {
    return { name: 'Bilbo' };
  }),
  createUser: t.procedure.input(z.object({ name: z.string().min(5) })).mutation(({ input }) => {
    return {
      created: true,
      newName: input.name,
    };
  }),
  testUser: t.procedure.input(z.object({ name: z.string().min(5) })).mutation(({ input, ctx }) => {
    console.log(ctx.getUrl());
    console.log(ctx.getIp());
    console.log(ctx.getMethod());
    console.log(ctx.getHeaders());

    return {
      created: true,
      newName: input.name,
    };
  }),
});

export const frameworkOptions: TrpcFrameworkOptions<TrpcContext> = {
  createContext: () => ({ currentDate: new Date() }),
};
