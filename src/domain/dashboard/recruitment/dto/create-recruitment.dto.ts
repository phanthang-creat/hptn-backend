import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecruitmentDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of Recruitment',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    name: 'slug',
    description: 'Slug of Recruitment',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({
    name: 'image',
    description: 'Image of Recruitment',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  image!: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of Recruitment',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiProperty({
    name: 'shortContent',
    description: 'Short content of Recruitment',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  shortContent!: string;

  @ApiProperty({
    name: 'content',
    description: 'Content of Recruitment',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  content!: string;

  @ApiProperty({
    name: 'enabled',
    description: 'Enabled of Recruitment',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  enabled!: boolean;

  @ApiProperty({
    name: 'typeId',
    description: 'Type of Recruitment',
    type: Number,
    required: false,
  })
  @IsOptional()
  typeId!: number;

  @ApiProperty({
    name: 'positionId',
    description: 'Position of Recruitment',
    type: Number,
    required: false,
  })
  @IsOptional()
  positionId!: number;

  @ApiProperty({
    name: 'address',
    description: 'Address of Recruitment',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  address!: string;
}
