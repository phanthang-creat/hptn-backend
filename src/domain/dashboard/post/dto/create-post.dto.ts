import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post title', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'post-title', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'Post description', type: String, required: false })
  @IsOptional()
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Post short content', type: String, required: false })
  @IsOptional()
  @IsString()
  shortContent!: string;

  @ApiProperty({ example: 'Post content', type: String, required: false })
  @IsOptional()
  @IsString()
  content!: string;

  @ApiProperty({
    example: 'http://example.com/abc.jpg',
    type: String,
    required: true,
    description: 'Image URL',
  })
  @IsNotEmpty()
  @IsString()
  image!: string;

  @ApiProperty({ example: true, type: Boolean, required: true })
  @IsNotEmpty()
  @IsBoolean()
  enabled!: boolean;

  @ApiProperty({ example: 'Post category', type: String })
  @IsOptional()
  @IsString()
  postCategoryId!: string;
}
