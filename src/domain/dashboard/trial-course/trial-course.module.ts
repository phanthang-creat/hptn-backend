import { Module } from '@nestjs/common';
import { TrialCourseService } from './trial-course.service';
import { TrialCourseController } from './trial-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrialCourse } from './entities/trial-course.entity';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrialCourse,
    ]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [TrialCourseController],
  providers: [TrialCourseService],
  exports: [TrialCourseService]
})
export class TrialCourseModule {}
