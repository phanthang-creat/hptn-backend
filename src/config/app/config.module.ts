import Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.production', '.env.test', '.env.provision'],
      isGlobal: true,
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_NAME: Joi.string().default('HiJob'),
        APP_URL: Joi.string().default('http://localhost:8000'),
        APP_PORT: Joi.number().required(),
        APP_MODE: Joi.string().default('development'),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
