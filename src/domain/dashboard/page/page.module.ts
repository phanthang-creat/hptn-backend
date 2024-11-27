import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './entities/page.entity';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
