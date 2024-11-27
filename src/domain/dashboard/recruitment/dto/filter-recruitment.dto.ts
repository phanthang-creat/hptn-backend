import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/pagination/page-options-dto';

export class FilterRecruitmentDto extends PageOptionsDto {
  @ApiProperty({ required: false, name: 'title', description: 'title' })
  @IsOptional()
  title!: string;

  @ApiProperty({
    required: false,
    name: 'enabled',
    description: 'status',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  enabled!: boolean;

  @ApiProperty({
    required: false,
    name: 'recruitmentTypeId',
    description: 'recruitmentTypeId',
  })
  @IsOptional()
  recruitmentTypeId!: number;

  @ApiProperty({
    required: false,
    name: 'recruitmentPositionId',
    description: 'recruitmentPositionId',
  })
  @IsOptional()
  @IsNumber()
  recruitmentPositionId!: number;

  @ApiProperty({ required: false, name: 'address', description: 'address' })
  @IsOptional()
  address!: string;

  @ApiProperty({
    required: false,
    name: 'excludeSlug',
    description: 'excludeSlug',
  })
  @IsOptional()
  excludeSlug!: string;
}
