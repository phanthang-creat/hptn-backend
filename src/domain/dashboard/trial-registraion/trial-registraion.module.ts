import { Module } from '@nestjs/common';
import { TrialRegistraionService } from './trial-registraion.service';
import { TrialRegistraionController } from './trial-registraion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrialRegistraion } from './entities/trial-registraion.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        TrialRegistraion
    ]),
    AuthModule,
    JwtAccessTokenModule
  ],
  controllers: [TrialRegistraionController],
  providers: [TrialRegistraionService],
  exports: [TrialRegistraionService]
})
export class TrialRegistraionModule {}
