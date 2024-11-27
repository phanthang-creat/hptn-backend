import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(
    exception: {
      message: any;
      getStatus: () => any;
      response: { message: any };
    },
    host: { switchToHttp: () => any },
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `${exception.message}` || 'Something went wrong',
      error: exception.response.message || '',
    });
  }
}
