import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProductImageDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsString()
    @IsOptional()
    image!: string;
    
}
