import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class DeleteUploadFileDto {
  @ApiProperty({
    description: 'File path',
    example: ['/folder/file.txt'],
    items: {
      type: 'string',
    },
  })
  @IsArray()
  @IsString({ each: true })
  path!: string[];

  @ApiProperty({
    description: 'Delete folder',
    example: false,
  })
  @IsBoolean()
  deleteFolder!: boolean;
}
