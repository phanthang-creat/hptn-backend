import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import { CreateProductImageDto } from "../../product-image/dto/create-product-image.dto";

export class CreateProductDto {
    @ApiProperty({ example: 'Product name', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({ example: 'product-name', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    slug!: string;

    @ApiProperty({ example: 'Product description', type: String, required: false })
    @IsOptional()
    @IsString()
    description!: string;

    @ApiProperty({ example: 'Product short content', type: String, required: false })
    @IsOptional()
    @IsString()
    shortContent!: string;

    @ApiProperty({ example: 'Product content', type: String, required: false })
    @IsOptional()
    @IsString()
    content!: string;

    @ApiProperty({
        example: 'http://example.com/abc.jpg',
        type: String,
        required: true,
        description: 'Image URL',
    })
    @IsNotEmpty()
    @IsString()
    image!: string;

    @ApiProperty({ example: true, type: Boolean, required: true })
    @IsNotEmpty()
    @IsBoolean()
    enabled!: boolean;

    @ApiProperty({ example: 'Product category id', type: String, required: false })
    @IsOptional()
    @IsString()
    categoryId!: string; 

    @ApiProperty({ example: 'Product price', type: Number, required: false })
    @IsOptional()
    @IsNumber()
    price!: number;

    @ApiProperty({ example: 'Product quantity', type: Number, required: false })
    @IsOptional()
    @IsNumber()
    quantity!: number;

    @ApiProperty({ type: [CreateProductImageDto], required: false,
     example: [{ image: 'http://example.com/abc.jpg' }] })
    @IsOptional()
    images!: CreateProductImageDto[];
}
