import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
