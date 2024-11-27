import { Module } from '@nestjs/common';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationStatusController } from './application-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStatus } from './entities/application-status.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationStatus
    ]),
    AuthModule,
    JwtAccessTokenModule
  ],
  controllers: [ApplicationStatusController],
  providers: [ApplicationStatusService]
})
export class ApplicationStatusModule {}
