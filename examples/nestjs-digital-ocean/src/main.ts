import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();
  await app.listen(3000);
}

bootstrap();
