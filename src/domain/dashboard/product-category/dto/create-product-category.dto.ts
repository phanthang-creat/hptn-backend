import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class CreateProductCategoryDto {
    @ApiProperty({ example: 'Category name', type: String })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'category-name', type: String })
    @IsString()
    @IsNotEmpty()
    slug!: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', type: String })
    @IsString()
    @IsNotEmpty()
    image!: string;

    @ApiProperty({
        example: 'Category description',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    description!: string;

    @ApiProperty({ example: 1, type: Number, required: false })
    @IsOptional()
    @IsNumber()
    order!: number;

    @ApiProperty({ example: 'uuid', type: String, required: false })
    @IsOptional()
    @IsString()
    parentId!: string;

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsOptional()
    @IsBoolean()
    enabled!: boolean;
}
