import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Query, Redirect, Req, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/nocontent')
  @HttpCode(HttpStatus.NO_CONTENT)
  getHello2(): void {
    return;
  }

  @Post('/sqs')
  public onSqs(@Headers('host') host: string, @Body() data: any, @Res() res: Response) {
    if (host !== 'sqs.amazonaws.com')
      return res.status(401).end();

    console.log(data);
    const willFail = Math.random() > 0.5;
    console.log(`Will fail? `, willFail);

    // i don't think this works
    res.status(200).json({
      batchItemFailures: willFail ? [
        {
          itemIdentifier: data.Records[0].messageId,
        },
      ] : [],
    });
  }

  @Get('/cookies')
  setCookies(@Req() req: Request, @Query('cookie') cookie: string, @Res({ passthrough: true }) res: Response): any {
    (res as any).cookie('test-cookie', cookie);
    (res as any).cookie('test-cookie-array', [cookie + 'array', cookie + 'array2']);

    return {
      oldCookie: (req as any).cookies,
      newCookie: {
        'test-cookie': cookie,
        'test-cookie-array': [cookie + 'array', cookie + 'array2'],
      },
    };
  }

  @Get('pdf')
  getFile() {
    const readable = createReadStream(join(__dirname, 'bitcoin.pdf'), {
      autoClose: true,
      emitClose: true,
    });

    return new StreamableFile(readable, {
      type: 'application/pdf',
      disposition: 'attachment; filename="bitcoin.pdf"',
    });
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 302)
  redirect() {
    return {};
  }
}
