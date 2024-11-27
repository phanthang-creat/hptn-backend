import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  // Logger,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';

import { AuthGuard } from 'src/authentication/auth.guard';
import { Role } from 'src/common/enums';
import { Roles } from 'src/authentication/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
// import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { DeleteUploadFileDto } from './dto/delete-upload-file.dto';
import LocalFilesInterceptor from 'src/common/interceptors/storage/localFiles.interceptor';
import { MulterPath } from 'src/common/enums';
import LocalFileInterceptor from 'src/common/interceptors/storage/localFile.interceptor';

@ApiTags('upload-files')
@Controller('upload-files')
export class UploadFilesController {
  constructor(
    private readonly uploadFilesService: UploadFilesService,
    private readonly configService: ConfigService,
  ) {}

  // Create a new folder
  // @Post('*')
  // @ApiParam({
  //   name: 'path',
  //   required: true,
  //   description:
  //     'Path folder (To create a new folder, please add / at the end of the path, for example: /new-folder/)',
  // })
  // @ApiOperation({
  //   summary: 'Create a new folder',
  // })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  // createFolder(@Param() path: string) {
  //   return this.uploadFilesService.createFolder(path[0]);
  // }

  // @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    LocalFilesInterceptor({ fieldName: 'files', path: MulterPath.IMAGES }),
  )
  create(@UploadedFiles() files: Express.Multer.File[]) {
    // Remove path of files
    try {
      if (!files) {
        throw new BadRequestException('Upload file failed')
      }
      const filesPath = this.configService.get('MULTER_DEST');

      files.forEach((file) => {
        file.path = file.path.replace(filesPath, '');
      });
      return files;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post("/cv")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        // folder: {
        //   type: 'string',
        // },
      },
    },
  })
  @UseInterceptors(
    LocalFileInterceptor({ fieldName: 'file', path: MulterPath.CV }),
  )
  uploadPdf(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Upload file failed')
      }
      // Remove path of file
      const filePath = this.configService.get('MULTER_DEST');

      file.path = file.path.replace(filePath, '');
      return file;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }


  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.uploadFilesService.findAll();
  }

  @Get('*')
  @ApiParam({
    name: 'path',
    required: true,
    description: 'Path folder',
  })
  @ApiOperation({
    summary:
      'Get all files in folder. Call this API in postman with GET method and path: /upload-files/:path/',
  })
  @ApiBearerAuth()
  findAllByPath(@Param() path: any) {
    // Logger
    return this.uploadFilesService.findAllByPath(path[0]);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  remove(@Body() dto: DeleteUploadFileDto) {
    return this.uploadFilesService.remove(dto);
  }
}
