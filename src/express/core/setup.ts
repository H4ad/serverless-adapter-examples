import { ExpressMetricController } from '../controllers/express-metric.controller';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// tslint:disable-next-line:no-var-requires
const express = require('express');

export const createApp = () => {
  const app = express();

  app.use(express.json());

  const metricController = new ExpressMetricController();

  app.get('/', (req, res) => {
    res.send('<h1>Sample in Express Project</h1>');
  });

  app.use(metricController.getRoutes());

  return app;
};

