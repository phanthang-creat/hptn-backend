import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryClosureEntity } from './entities/product-category-closure.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, ProductCategoryClosureEntity]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
