import { FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import { ConfigService } from '@nestjs/config';
import { uuidv7 } from 'uuidv7';
import { MulterPath } from 'src/common/enums';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get('MULTER_DEST') + '/uploads/';

      const destination = `${filesDestination}${options.path}`;

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
          filename: (_req, file, cb) => {
            const randomName = uuidv7() + "." + file.mimetype.split('/')[1];
            cb(null, randomName);
          },
        }),
        fileFilter: (_req, file, cb) => {
          if (!file.originalname.match(fileRegex)) {
            return cb(
              // Server will throw error if file type is not match
              // and crash the server
              // why? because we use interceptor to handle file upload
              // so we need to handle error here
              null,
              false,
            );
          }
          cb(null, true) 
        }
      };

      this.fileInterceptor = new (FilesInterceptor(
        options.fieldName,
        10,
        multerOptions,
      ))();
    }

    async intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
