import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/app/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/interceptors/exceptions/http-exception.filter';
import cookieParser from 'cookie-parser';
import { TypeOrmExceptionFilter } from './common/interceptors/exceptions/typeorm-exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';
// import { CSRFMidlleWare } from './common/middleware/csrf-csrf.middleware';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  // app.use(CSRFMidlleWare)

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://staging.panochess.edu.vn',
      'https://panochess.edu.vn',
      'https://www.panochess.edu.vn',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter(), new TypeOrmExceptionFilter());

  const appConfig: AppConfigService = app.get(AppConfigService);
  const port = appConfig.port || 8000;
  const mode = appConfig.mode;

  const openAPIConfig = new DocumentBuilder()
    .setTitle(appConfig.name || 'NestJS API')
    .setDescription('The API description')
    .addBearerAuth()
    .setVersion('3.0')
    .build();

  const document = SwaggerModule.createDocument(app, openAPIConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(
      `Server running on http://localhost:${port} in ${mode} mode`,
      'Bootstrap',
    );
  });
}
bootstrap();
