// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { JwtAccessTokenService } from './atk.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JwtConfigModule, AppConfigModule],
      inject: [JwtConfigService, AppConfigService],
      useFactory: (
        _configService: JwtConfigService,
        _appConfigService: AppConfigService,
      ) =>
        ({
          secret: process.env['JWT_SECRET'],
          secretOrKeyProvider: (
            _requestType: any,
            _tokenOrPayload: any,
            _options?: any,
          ) => {
            return process.env['JWT_SECRET'];
          },
        } as JwtModuleOptions),
    }),
  ],
  providers: [JwtAccessTokenService, JwtConfigService],
  exports: [JwtAccessTokenService, JwtConfigService],
  controllers: [],
})
export class JwtAccessTokenModule {}
