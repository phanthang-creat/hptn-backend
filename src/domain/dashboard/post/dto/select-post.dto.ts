import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/pagination/page-options-dto';

export class SelectPostDto extends PageOptionsDto {
  @ApiProperty({
    name: 'enabled',
    type: Boolean,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  enabled!: boolean;

  @ApiProperty({ name: 'excludeSlug', type: String, required: false })
  @IsOptional()
  excludeSlug!: string;
}
