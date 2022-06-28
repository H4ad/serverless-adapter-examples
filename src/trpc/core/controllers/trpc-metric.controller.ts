// #region Imports

import { AnyRouter, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { CreateMetricBody, Metric, MetricService } from '../../../core/services/metric.service';
import { TrpcContext } from '../router';

// #endregion

export class TrpcMetricController {
  //#region Protected Properties

  protected readonly service: MetricService = new MetricService();

  //#endregion

  // #region Public Methods

  public getRoutes(router: AnyRouter<TrpcContext>): AnyRouter<TrpcContext> {
    return router
      .query('metrics', {
        resolve: () => this.getAllMetrics(),
      })
      .query('metricByHumidity', {
        input: z.number(),
        resolve: ({ input }) => this.getAllMetrics().find(metric => metric.humidity === input),
      })
      .mutation('metric', {
        input: z.object({
          humidity: z.number(),
          temperature: z.number(),
        }),
        resolve: ({ input, ctx }) => this.createMetric(ctx, input as CreateMetricBody),
      });
  }

  // #endregion

  // #region Private Methods

  private getAllMetrics(): Metric[] {
    return this.service.getAllMetrics();
  }

  private createMetric(ctx: TrpcContext, body: CreateMetricBody): Metric {
    try {
      const entity = this.service.createMetric(body);

      ctx.setStatus(201);

      return entity;
    } catch (e) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: e.message,
      });
    }
  }

  // #endregion
}
