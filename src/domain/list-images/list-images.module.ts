import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ListImagesService } from './list-images.service';
import { ListImagesController } from './list-images.controller';
import { ListImage } from './entities/list-image.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListImage]),
    AuthModule,
    JwtAccessTokenModule
  ],
  controllers: [ListImagesController],
  providers: [ListImagesService]
})
export class ListImagesModule {}
