import * as Joi from 'joi';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MariadbConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.production', '.env.test', '.env.provision'],
      isGlobal: true,
      validationSchema: Joi.object({
        MARIADB_HOST: Joi.string().required(),
        MARIADB_PORT: Joi.number().required(),
        MARIADB_USERNAME: Joi.string().required(),
        MARIADB_PASSWORD: Joi.string().required(),
        MARIADB_DATABASE: Joi.string().required(),
        MARIADB_LOGGING: Joi.boolean().required(),
      }),
    }),
  ],
  providers: [MariadbConfigService],
  exports: [MariadbConfigService],
})
export class MariadbConfigModule {}
