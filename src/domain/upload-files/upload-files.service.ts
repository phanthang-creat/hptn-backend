import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { validatePathFolder } from 'src/common/helper';
import { join } from 'path';
import { createReadStream } from 'fs';
import { uuidv7 } from 'uuidv7';
import { DeleteUploadFileDto } from './dto/delete-upload-file.dto';
import * as fs from 'fs';

@Injectable()
export class UploadFilesService {
  create(
    files: Express.Multer.File[],
    createUploadFileDto: CreateUploadFileDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('File is required');
    }

    const root = 'upload';

    const folder = createUploadFileDto.folder || '';

    if (!validatePathFolder(join(folder))) {
      throw new BadRequestException('LFI/RFI detected :)');
    }

    const fs = require('fs');

    const fileFolder = `${root}` + (folder ? `/${folder}` : '');

    // mkdir if not exist
    if (!fs.existsSync(fileFolder)) {
      fs.mkdirSync(fileFolder);
    }

    // save file
    const result = files.map((file) => {
      const fileName = `${uuidv7()}-${file.originalname}`;
      const filePath = `${fileFolder}/${fileName}`;
      console.log(fileFolder);
      fs.writeFileSync(filePath, file.buffer);
      return {
        fileName,
        filePath,
        mineType: file.mimetype,
        size: file.size,
      };
    });

    return {
      message: 'Upload file success',
      data: result,
    };
  }

  findAll() {
    const dir = 'upload';

    const fs = require('fs');

    const files = fs.readdirSync(dir);

    return files.map((file: Express.Multer.File) => {
      const stats = fs.statSync(`${dir}/${file}`);
      return {
        name: file,
        url: `${dir}/${file}`,
        size: stats.size,
        isDirectory: stats.isDirectory(),
      };
    });
  }

  findAllByPath(p: string) {
    if (!validatePathFolder(p)) {
      throw new BadRequestException('LFI/RFI detected :)');
    }

    try {
      const dir = `upload/${p}`;

      const files = createReadStream(dir);

      return new StreamableFile(files);
    } catch (error) {
      throw new BadRequestException('Folder not found');
    }
  }

  createFolder(folder: string) {
    // validate folder name
    if (!validatePathFolder(join(folder))) {
      throw new BadRequestException('LFI/RFI detected :)');
    }

    const fs = require('fs');

    // mkdir if not exist
    const dir = `upload/${folder}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    } else {
      return {
        message: 'Folder already exist',
        data: {
          name: folder,
          url: dir,
        },
      };
    }

    return {
      message: 'Create folder success',
      data: {
        name: folder,
        url: dir,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  remove(dto: DeleteUploadFileDto) {
    // const fs = require('fs');

    if (!dto.path || dto.path.length === 0) {
      throw new BadRequestException('File path is required');
    }

    if (!dto.deleteFolder) {
      dto.path.forEach((path) => {
        try {
          if (!validatePathFolder(path)) {
            throw new BadRequestException(
              'Delete file failed, LFI/RFI detected :)',
            );
          }

          if (!path.startsWith('upload')) {
            throw new BadRequestException(
              'Delete file failed. File path must start with upload/',
            );
          }

          fs.unlinkSync(`${path}`);
        } catch (err) {
          throw new BadRequestException('Delete file failed');
        }
      });
    } else {
      dto.path.forEach((path) => {
        try {
          if (!validatePathFolder(path)) {
            throw new BadRequestException(
              'Delete folder failed, LFI/RFI detected :)',
            );
          }

          if (!path.startsWith('upload')) {
            throw new BadRequestException(
              'Delete folder failed. File path must start with upload/',
            );
          }

          fs.rmSync(`${path}`, { recursive: true, force: false });
        } catch (err) {
          throw err;
        }
      });
    }

    return {
      message: 'Delete file success',
    };
  }
}
