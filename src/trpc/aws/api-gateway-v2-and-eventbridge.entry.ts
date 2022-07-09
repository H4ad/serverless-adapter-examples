import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, EventBridgeAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { TrpcFramework, TrpcFrameworkOptions } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { TRPCError } from '@trpc/server';
import type { ScheduledEvent } from 'aws-lambda';
import { z } from 'zod';
import { TrpcContext } from '../core/router';
import { createApp } from '../core/setup';

const app = createApp()
  .mutation('eventbridge', {
    input: z.object({
      Records: z.array(z.any()),
    }),
    resolve: ({ input, ctx }) => {
      if (ctx.getHeader('host') !== 'events.amazonaws.com')
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Wrong host.',
        });

      const scheduleEvent = input as ScheduledEvent<{ action: 'my_25min_cron' | 'my_50min_cron' }>;

      switch(scheduleEvent.detail.action) {
        case 'my_25min_cron':
          console.log('Your 25 min schedule expression was called.');
          break;
        case 'my_50min_cron':
          console.log('Your 50 min schedule expression was called.');
          break;
        default:
          console.error('The action was not recognized.');
          break;
      }
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
  .addAdapter(new EventBridgeAdapter())
  .build();
