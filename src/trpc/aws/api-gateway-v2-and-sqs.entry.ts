import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { TrpcFramework, TrpcFrameworkOptions } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { TRPCError } from '@trpc/server';
import type { SQSEvent } from 'aws-lambda';
import { z } from 'zod';
import { TrpcContext } from '../core/router';
import { createApp } from '../core/setup';

const app = createApp()
  .mutation('sqs', {
    input: z.object({
      Records: z.array(z.any()),
    }),
    resolve: ({ input, ctx }) => {
      if (ctx.getHeader('host') !== 'sqs.amazonaws.com')
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Wrong host.',
        });

      const event = input as SQSEvent;

      // tslint:disable-next-line:no-console
      console.log(event);
    },
  });

const frameworkOptions: TrpcFrameworkOptions<TrpcContext> = {
  // you can return an promise without problems
  createContext: () => ({ potato: true }),
  // createContext: () => ({ potato: false }),
};

export const handler = ServerlessAdapter.new(app)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(new TrpcFramework(frameworkOptions))
  .addAdapter(new ApiGatewayV2Adapter())
  .addAdapter(new SQSAdapter())
  .build();
