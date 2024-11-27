import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MariadbConfigModule } from '../../../config/database/mariadb/config.module';
import { MariadbConfigService } from '../../../config/database/mariadb/config.service';
import { addTransactionalDataSource } from 'typeorm-transactional';
import dataSource from 'src/config/database/migrations/config/datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MariadbConfigModule],
      useFactory: async (configService: MariadbConfigService) => {
        const option: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: configService.host,
          port: configService.port,
          username: configService.username,
          password: configService.password,
          database: configService.database,
          // synchronize: true,
          logging: Boolean(configService.logging),
          timezone: '+07:00',
          poolSize: 10,
          entities: [],
          autoLoadEntities: true,
          keepConnectionAlive: true,
        };
        return option;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(dataSource).initialize();
      },
      inject: [MariadbConfigService],
    }),
  ],
})
export class MariadbDBModule {}
