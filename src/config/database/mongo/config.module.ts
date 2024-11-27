import Joi from 'joi';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseDBConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.production', '.env.test', '.env.provision'],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB_HOST: Joi.string().required(),
        MONGO_DB_PORT: Joi.number().required(),
        MONGO_DB_USERNAME: Joi.string().required(),
        MONGO_DB_PASSWORD: Joi.string().required(),
        MONGO_DB_DATABASE: Joi.string().required(),
      }),
    }),
  ],
  providers: [MongooseDBConfigService],
  exports: [MongooseDBConfigService],
})
export class MongooseDBConfigModule {}
