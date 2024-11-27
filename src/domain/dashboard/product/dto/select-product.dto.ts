import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PageOptionsDto } from "src/common/dto/pagination/page-options-dto";

export class SelectProductDto extends PageOptionsDto {
    @ApiProperty({
      name: 'enabled',
      type: Boolean,
      required: false,
      default: true,
    })
    @IsBoolean()
    @IsOptional()
    enabled!: boolean;

    @ApiProperty({
      name: 'excludeSlug',
      type: String,
      required: false,
    })
    @IsOptional()
    @IsString()
    excludeSlug?: string;

}