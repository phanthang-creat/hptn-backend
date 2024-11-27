import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CreatePostCategory1703231720631 } from '../1703231720631-CreatePostCategory';
import { PostCategoriesClosureTableMigrations } from '../1703350953692-PostCategoriesClosureTableMigrations';
import { CreatePost1703403597478 } from '../1703403597478-CreatePost';
import { UpdatePostAndPostCategory1703414666478 } from '../1703414666478-UpdatePostAndPostCategory';
import { AddColumnOrderToPostAndPostCategory1703415423215 } from '../1703415423215-AddColumnOrderToPostAndPostCategory';
import { AddUniqueKeyForPostSlug1703428939766 } from '../1703428939766-AddUniqueKeyForPostSlug';
import { ChangeDataTypeOfPost1703430545897 } from '../1703430545897-ChangeDataTypeOfPost';
import { CreateRecruitmentTypes1703481512001 } from '../1703481512001-CreateRecruitmentTypes';
import { CreateRecruitmentPositions1703481596432 } from '../1703481596432-CreateRecruitmentPositions';
import { CreateRecruitments1703481602006 } from '../1703481602006-CreateRecruitments';
import { ProductCategories1703602364309 } from '../1703602364309-ProductCategories';
import { ProductImages1703602368487 } from '../1703602368487-ProductImages';
import { Products1703602368486 } from '../1703602368486-Products';
import { ProductCategoriesClosure1703603704032 } from '../1703603704032-ProductCategoriesClosure';
import { Application1703649648551 } from '../1703649648551-Application';
import { ApplicationStatus1703649648500 } from '../1703649648500-ApplicationStatus';
import { PostCategoryImages1703667592038 } from '../1703667592038-PostCategoryImages';
import { TrialCourse1703907004985 } from '../1703907004985-TrialCourse';
import { TrialRegistration1703918831999 } from '../1703918831999-TrialRegistration';

dotenv.config();

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'mariadb',
  host: configService.get('MARIADB_HOST'),
  port: parseInt(configService.get('MARIADB_PORT') || '3306'),
  username: configService.get('MARIADB_USERNAME'),
  password: configService.get('MARIADB_PASSWORD'),
  database: configService.get('MARIADB_DATABASE'),
  logging: configService.get('MARIADB_LOGGING') === 'true',
  timezone: '+07:00',
  poolSize: 10,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [
    CreatePostCategory1703231720631,
    PostCategoriesClosureTableMigrations,
    CreatePost1703403597478,
    UpdatePostAndPostCategory1703414666478,
    AddColumnOrderToPostAndPostCategory1703415423215,
    AddUniqueKeyForPostSlug1703428939766,
    ChangeDataTypeOfPost1703430545897,
    CreateRecruitmentTypes1703481512001,
    CreateRecruitmentPositions1703481596432,
    CreateRecruitments1703481602006,
    Products1703602368486,
    ProductCategories1703602364309,
    ProductImages1703602368487,
    ProductCategoriesClosure1703603704032,
    ApplicationStatus1703649648500,
    Application1703649648551,
    PostCategoryImages1703667592038,
    TrialCourse1703907004985,
    TrialRegistration1703918831999,
  ],
});

export default dataSource;
