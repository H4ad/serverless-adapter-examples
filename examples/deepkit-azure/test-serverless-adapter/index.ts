import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { HtmlResponse, HttpKernel, HttpModule, HttpQuery, HttpRouterRegistry } from '@deepkit/http';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HttpTriggerV4Adapter } from '@h4ad/serverless-adapter/lib/adapters/azure';
import { HttpDeepkitFramework } from '@h4ad/serverless-adapter/lib/frameworks/deepkit';
import { AzureHandler } from '@h4ad/serverless-adapter/lib/handlers/azure';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';

const app = new App({
  controllers: [],
  imports: [
    new HttpModule({ debug: true }),
    new FrameworkModule({ debug: true, httpLog: true }),
  ],
});

const router = app.get(HttpRouterRegistry);

router.get('/', () => {
  return new HtmlResponse('<h1>Sample in Deepkit Project</h1>');
});

router.get('/count', (count: HttpQuery<number>) => {
  return new HtmlResponse(`<h1>Sample in Deepkit Project #${ count }</h1>`);
});

const httpKernel = app.get(HttpKernel);

export const handler = ServerlessAdapter.new(httpKernel)
  .setFramework(new HttpDeepkitFramework())
  .setHandler(new AzureHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HttpTriggerV4Adapter({ stripBasePath: '/api' }))
  .build();
