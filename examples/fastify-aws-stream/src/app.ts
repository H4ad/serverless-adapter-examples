import fastify from 'fastify';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';

const app = fastify();

app.get('/', async (request, reply) => {
  return 'Hello World\n';
});

app.get('/pdf', async (request, reply) => {
  const pdf = createReadStream(join(__dirname, 'bitcoin.pdf'));

  reply.header('Content-Type', 'application/pdf');
  reply.header('Content-Disposition', 'attachment; filename="bitcoin.pdf"');
  reply.status(200).send(pdf);

  return reply;
});

export { app };
