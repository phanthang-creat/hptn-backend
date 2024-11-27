import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';
import { AdminModule } from 'src/domain/admin/admin.module';
import { AuthController } from './auth.controller';
// import { JwtAccessTokenService } from 'src/service/jwt/atk.service';
// import { AdminService } from 'src/domain/admin/admin.service';

@Module({
  imports: [AdminModule, JwtAccessTokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
