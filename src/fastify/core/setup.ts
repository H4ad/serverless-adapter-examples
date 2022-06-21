import { FastifyMetricController } from './controllers/fastify-metric.controller';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// tslint:disable-next-line:no-var-requires
import Fastify from 'fastify';

export const createApp = () => {
  const app = Fastify({
    logger: true,
  });

  const metricController = new FastifyMetricController();

  app.get('/', (req, res) => {
    res.send('<h1>Sample in Fastify Project</h1>');
  });

  metricController.initializeRoutes(app);

  return app;
};

