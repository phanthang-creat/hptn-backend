import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecruitmentTypeDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of Recruitment type',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: 'slug',
    description: 'Slug of Recruitment type',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  slug!: string;
}
