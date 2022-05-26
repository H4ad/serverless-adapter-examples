import { createApp } from './core/setup';

export const bootstrap = async () => {
  const app = createApp();

  app.listen(process.env.PORT, () => {
    console.log('listening on -> 3000');
  });
}

bootstrap();
