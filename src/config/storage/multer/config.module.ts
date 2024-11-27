import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { MulterStorageConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [
        '.env.development',
        '.env.production',
        '.env.test',
        '.env.provision',
      ],
      isGlobal: true,
      validationSchema: Joi.object({
        MULTER_DEST: Joi.string().required(),
      }),
    }),
  ],
  providers: [MulterStorageConfigService],
  exports: [MulterStorageConfigService],
})
export class MulterStorageConfigModule {}
