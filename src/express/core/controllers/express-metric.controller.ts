// #region Imports

import express from 'express';
import { MetricService } from '../../../core/services/metric.service';

// #endregion

export class ExpressMetricController {

  //#region Protected Properties

  protected readonly service: MetricService = new MetricService();

  //#endregion

  // #region Public Methods

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/metrics', this.getAllMetrics.bind(this));
    router.post('/metrics', this.createMetric.bind(this));

    return router;
  }

  // #endregion

  // #region Private Methods

  private async getAllMetrics(_, res): Promise<void> {
    res.json(this.service.getAllMetrics());
  }

  private async createMetric(req, res): Promise<void> {
    try {
      const entity = this.service.createMetric(req.body);

      return res.json(entity);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  // #endregion
}
