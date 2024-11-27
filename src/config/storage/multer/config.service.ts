/**
 * Bull configuration
 *
 * @class
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterStorageConfigService {
  constructor(private configService: ConfigService) {}

  get dest() {
    return this.configService.get<string>('multer.dest');
  }
}
