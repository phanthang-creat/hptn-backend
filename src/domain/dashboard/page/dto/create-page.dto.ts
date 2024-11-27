import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsOptional()
  name!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsOptional()
  code!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsOptional()
  // @IsUrl({}, { message: 'Link must be url' })
  link!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsOptional()
  config: any = "";
}
