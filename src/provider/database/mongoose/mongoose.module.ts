import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongooseDBConfigModule } from 'src/config/database/mongo/config.module';
import { MongooseDBConfigService } from 'src/config/database/mongo/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongooseDBConfigModule],
      useFactory: async (configService: MongooseDBConfigService) =>
        ({
          uri: `mongodb://${configService.username}:${configService.password}@${configService.host}:${configService.port}/${configService.database}?authSource=admin`,
          // useCreateIndex: true,
          // useFindAndModify: false,
        } as MongooseModuleFactoryOptions),
      inject: [MongooseDBConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class MongooseDBModule {}
