import { Module } from '@nestjs/common';
import { HeadersService } from './headers.service';
import { HeadersController } from './headers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Header, HeaderSchema } from './entities/header.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Header.name, schema: HeaderSchema }]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [HeadersController],
  providers: [HeadersService],
  exports: [HeadersService],
})
export class HeadersModule {}
