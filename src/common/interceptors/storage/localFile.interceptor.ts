import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import { ConfigService } from '@nestjs/config';
import { uuidv7 } from 'uuidv7';
import { MulterPath } from 'src/common/enums';

interface LocalFileInterceptorOptions {
  fieldName: string;
  path?: string;
}

function LocalFileInterceptor(
  options: LocalFileInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const fileDestination = configService.get('MULTER_DEST') + '/uploads/';

      const destination = `${fileDestination}${options.path}`;

      let fileRegex = new RegExp('');

      if (options.path === MulterPath.CV) {
        fileRegex = /(\.pdf|\.doc|\.docx)$/i;
      } else {
        if (options.path === MulterPath.IMAGES) {
          // image: png, jpg, jpeg, gif, svg, webp, bmp
          fileRegex = /(\.jpg|\.jpeg|\.png|\.gif|\.svg|\.webp|\.bmp)$/i;
        }
      } 

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: (_req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: string) => void) => {
            const randomName = uuidv7() + "." + file.mimetype.split('/')[1];
            cb(null, randomName);
          },
        }),
        fileFilter: (_req, file, cb) => {
          if (!file.originalname.match(fileRegex)) {
            return cb(
              null,
              false,
            );
          }
          cb(null, true) 
        }
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }
    async intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFileInterceptor;
