import { Module } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryController } from './post-category.controller';
import { PostCategoryEntity } from './entities/post-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { AuthModule } from 'src/authentication/auth.module';
import { PostCategoryClosureEntity } from './entities/post-category-closure.entity';
import { PostCategoryImage } from '../post-category-image/entities/post-category-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostCategoryEntity, PostCategoryClosureEntity, PostCategoryImage]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [PostCategoryController],
  providers: [PostCategoryService],
  exports: [PostCategoryService],
})
export class PostCategoryModule {}
