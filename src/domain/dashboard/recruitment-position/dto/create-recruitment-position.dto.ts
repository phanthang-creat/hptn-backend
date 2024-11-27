import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecruitmentPositionDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of Recruitment position',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: 'slug',
    description: 'Slug of Recruitment position',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  slug!: string;
}
