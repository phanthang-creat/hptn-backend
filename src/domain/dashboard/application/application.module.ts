import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { Recruitment } from '../recruitment/entities/recruitment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Recruitment,
    ]),
    AuthModule,
    JwtAccessTokenModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
