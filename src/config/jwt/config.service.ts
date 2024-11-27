/**
 * @description JWT Config Service
 *
 * @class
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly jwtConfigService: ConfigService) {}

  get accessTokenPrivateKey() {
    return this.jwtConfigService.get<string>('jwt.accessTokenPrivateKey');
  }

  get accessTokenPublicKey() {
    return this.jwtConfigService.get<string>('jwt.accessTokenPublicKey');
  }

  get accessTokenExpiresIn() {
    return this.jwtConfigService.get<string>('jwt.accessTokenExpiresIn');
  }
}
