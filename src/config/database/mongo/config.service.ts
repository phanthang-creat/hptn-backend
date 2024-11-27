import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Database configuration service
 *
 * @class
 */

@Injectable()
export class MongooseDBConfigService {
  /**
   * Constructor
   *
   * @param {ConfigService} configService Configuration service
   */
  constructor(private configService: ConfigService) {}

  /**
   * Get database host
   *
   * @returns {string | undefined} Database host
   */
  get host(): string | undefined {
    return this.configService.get<string>('mongoose.host');
  }

  /**
   * Get database port
   *
   * @returns {number | undefined} Database port
   */
  get port(): number | undefined {
    return this.configService.get<number>('mongoose.port');
  }

  /**
   * Get database username
   *
   * @returns {string | undefined} Database username
   */
  get username(): string | undefined {
    return this.configService.get<string>('mongoose.username');
  }

  /**
   * Get database password
   *
   * @returns {string | undefined} Database password
   */
  get password(): string | undefined {
    return this.configService.get<string>('mongoose.password');
  }

  /**
   * Get database name
   *
   * @returns {string | undefined} Database name
   */
  get database(): string | undefined {
    return this.configService.get<string>('mongoose.database');
  }
}
