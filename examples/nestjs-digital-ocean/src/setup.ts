import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

export async function createApp() {
  // if you want to add support for fastify, just change this ExpressAdapter for FastifyAdapter
  // see more: https://docs.nestjs.com/techniques/performance
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: true,
  });

  return app;
}
