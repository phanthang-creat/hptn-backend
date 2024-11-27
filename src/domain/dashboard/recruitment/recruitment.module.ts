import { Module } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // import entity
      Recruitment,
    ]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
