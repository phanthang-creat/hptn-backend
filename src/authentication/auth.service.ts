import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/domain/admin/admin.service';
import { LoginDto } from './dto/auth.dto';
import { createHash } from 'crypto';
import { IJwtPayload } from 'src/service/jwt/jwt-payload.interface';
import { JwtAccessTokenService } from 'src/service/jwt/atk.service';

// import { getMetadataArgsStorage } from "typeorm";
// import { SignInEmailDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private admin: AdminService,
    private jwtService: JwtAccessTokenService,
  ) {}

  async logIn(logInDto: LoginDto) {
    const check = await this.admin.findByUsername(logInDto.username);
    if (!check) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // SHA256
    const hashPassword = createHash('SHA256')
      .update(logInDto.password)
      .digest('hex');

    const admin = await this.admin.findByUsernameAndPassword(
      logInDto.username,
      hashPassword,
    );

    if (!admin) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: IJwtPayload = {
      id: admin._id.toString(),
      roles: [admin.role.toString()],
    };

    const accessToken = await this.jwtService.generateAccessToken(payload);

    return {
      accessToken,
    };
  }
}
