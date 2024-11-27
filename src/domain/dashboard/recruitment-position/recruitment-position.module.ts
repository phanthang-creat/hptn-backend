import { Module } from '@nestjs/common';
import { RecruitmentPositionService } from './recruitment-position.service';
import { RecruitmentPositionController } from './recruitment-position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentPosition } from './entities/recruitment-position.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // import entity
      RecruitmentPosition,
    ]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [RecruitmentPositionController],
  providers: [RecruitmentPositionService],
  exports: [RecruitmentPositionService],
})
export class RecruitmentPositionModule {}
