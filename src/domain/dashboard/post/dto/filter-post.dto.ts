import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SelectPostDto } from './select-post.dto';

export class FilterPostDto extends SelectPostDto {
  @ApiProperty({ name: 'title', type: String, required: false })
  @IsOptional()
  title!: string;

  @ApiProperty({ name: 'postCategorySlug', type: String, required: false })
  @IsOptional()
  postCategorySlug!: string;

  @ApiProperty({
    name: 'minDate',
    type: Date,
    required: false,
    default: new Date(),
  })
  @IsOptional()
  minDate!: Date;

  @ApiProperty({
    name: 'maxDate',
    type: Date,
    required: false,
    default: new Date(),
  })
  @IsOptional()
  maxDate!: Date;
}
