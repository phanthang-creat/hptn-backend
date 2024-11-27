import { Module } from '@nestjs/common';
import { RecruitmentTypeService } from './recruitment-type.service';
import { RecruitmentTypeController } from './recruitment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentType } from './entities/recruitment-type.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // import entity
      RecruitmentType,
    ]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [RecruitmentTypeController],
  providers: [RecruitmentTypeService],
  exports: [RecruitmentTypeService],
})
export class RecruitmentTypeModule {}
