import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { HtmlResponse, HttpModule, HttpQuery, HttpRouterRegistry } from '@deepkit/http';

export function createApp() {
  const app = new App({
    controllers: [],
    imports: [
      new FrameworkModule(),
    ],
  });

  const router = app.get(HttpRouterRegistry);

  router.get('/', () => {
    return new HtmlResponse('<h1>Sample in Deepkit Project</h1>');
  });

  router.get('/query', (count: HttpQuery<number>) => {
    return new HtmlResponse(`<h1>Your query param is: ${ count }</h1>`);
  });

  return app;
}
