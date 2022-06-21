// #region Imports

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateMetricBody, MetricService } from '../../../core/services/metric.service';

// #endregion

export class FastifyMetricController {
  //#region Protected Properties

  protected readonly service: MetricService = new MetricService();

  //#endregion

  // #region Public Methods

  public initializeRoutes(app: FastifyInstance): void {
    app.get('/metrics', this.getAllMetrics.bind(this));
    app.post('/metrics', this.createMetric.bind(this));
  }

  // #endregion

  // #region Private Methods

  private async getAllMetrics(_, res: FastifyReply): Promise<void> {
    res.send(this.service.getAllMetrics());
  }

  private async createMetric(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const entity = this.service.createMetric(req.body as CreateMetricBody);

      return res.send(entity);
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  }

  // #endregion
}
