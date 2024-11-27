import { MulterModule } from '@nestjs/platform-express';
import { MulterStorageConfigModule } from 'src/config/storage/multer/config.module';
import { MulterStorageConfigService } from 'src/config/storage/multer/config.service';

MulterModule.registerAsync({
  imports: [MulterStorageConfigModule],
  useFactory: async (configService: MulterStorageConfigService) => ({
    dest: configService.dest + '/uploads/',
  }),
  inject: [MulterStorageConfigService],
});

export class MulterStorageModule {}
