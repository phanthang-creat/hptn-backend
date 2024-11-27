import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreatePostCategoryImageDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsString()
    @IsOptional()
    image!: string;

    postCategoryId!: string;
}
