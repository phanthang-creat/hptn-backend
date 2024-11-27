import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, TypeORMError)
export class TypeOrmExceptionFilter {
  catch(exception: QueryFailedError, host: { switchToHttp: () => any }) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const errorCode = (exception.driverError as any)?.code ?? '';

    Logger.debug(errorCode);

    // switch (errorCode) {
    //   case 'ER_DUP_ENTRY':
    //     message = 'Duplicate entry';
    //     break;
    //   case 'ER_NO_REFERENCED_ROW_2':
    //     message = 'Foreign key constraint fails';
    //     break;
    //   default:
    //     message = 'Something went wrong';
    //     break;
    // }

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
