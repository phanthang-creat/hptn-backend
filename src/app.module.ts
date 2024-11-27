import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { MongooseDBModule } from './provider/database/mongoose/mongoose.module';
import { MongooseDBConfigModule } from './config/database/mongo/config.module';
import { HeadersModule } from './domain/dashboard/header/headers.module';
import { AdminModule } from './domain/admin/admin.module';
import { AuthModule } from './authentication/auth.module';
import { JwtAccessTokenModule } from './service/jwt/atk.module';
import { FooterModule } from './domain/dashboard/footer/footer.module';
import { UploadFilesModule } from './domain/upload-files/upload-files.module';
import { MulterStorageModule } from './provider/storage/multer/multer.module';
import { PageModule } from './domain/dashboard/page/page.module';
import { PostModule } from './domain/dashboard/post/post.module';
import { PostCategoryModule } from './domain/dashboard/post-category/post-category.module';
import { MariadbDBModule } from './provider/database/mariadb/mariadb.module';
import { RecruitmentModule } from './domain/dashboard/recruitment/recruitment.module';
import { RecruitmentPositionModule } from './domain/dashboard/recruitment-position/recruitment-position.module';
import { RecruitmentTypeModule } from './domain/dashboard/recruitment-type/recruitment-type.module';
import { ProductCategoryModule } from './domain/dashboard/product-category/product-category.module';
import { ProductImageModule } from './domain/dashboard/product-image/product-image.module';
import { ProductModule } from './domain/dashboard/product/product.module';
import { ApplicationModule } from './domain/dashboard/application/application.module';
import { ApplicationStatusModule } from './domain/dashboard/application-status/application-status.module';
import { PostCategoryImageModule } from './domain/dashboard/post-category-image/post-category-image.module';
import { TrialCourseModule } from './domain/dashboard/trial-course/trial-course.module';
import { TrialRegistraionModule } from './domain/dashboard/trial-registraion/trial-registraion.module';
import { GreatestGamesModule } from './domain/dashboard/greatest-games/greatest-games.module';
import { ListImagesModule } from './domain/list-images/list-images.module';


@Module({
  imports: [
    // CONFIG MODULES
    AppConfigModule,
    MongooseDBConfigModule,
    MulterStorageModule,
    MariadbDBModule,

    // DATABASE MODULES
    MongooseDBModule,
    HeadersModule,
    FooterModule,

    // DOMAIN MODULES
    AdminModule,

    // Auth
    AuthModule,
    JwtAccessTokenModule,
    UploadFilesModule,

    // Dashboard
    PageModule,
    PostModule,
    PostCategoryModule,
    RecruitmentModule,
    RecruitmentPositionModule,
    RecruitmentTypeModule,
    ProductModule,
    ProductCategoryModule,
    ProductImageModule,
    ApplicationModule,
    ApplicationStatusModule,
    PostCategoryImageModule,
    TrialCourseModule,
    TrialRegistraionModule,
    GreatestGamesModule,
    ListImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
