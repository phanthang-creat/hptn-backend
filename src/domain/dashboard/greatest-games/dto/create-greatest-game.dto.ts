import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateGreatestGameDto {

    @ApiProperty({
        type: String,
        required: false,
        default: 'N/A'
    })
    @IsString()
    @IsNotEmpty()
    whiteName!: string;

    // rating
    @ApiProperty({
        type: Number,
        required: false,
        default: 0
    })
    @IsNotEmpty()
    @IsNumber()
    whiteRating!: Number;

    @ApiProperty({
        type: String,
        required: false,
        default: 'N/A'
    })
    @IsString()
    @IsNotEmpty()
    result!: string;

    @ApiProperty({
        type: String,
        required: false,
        default: 'N/A'
    })
    @IsString()
    @IsNotEmpty()
    blackName!: string;

    @ApiProperty({
        type: Number,
        required: false,
        default: 0
    })
    @IsNotEmpty()
    @IsNumber()
    blackRating!: Number;

    @ApiProperty({
        type: Date,
        required: false,
        default: new Date()
    })
    @IsNotEmpty()
    playedDate!: Date;
   
    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    embedLink!: string;

    @ApiProperty({
        type: Number,
        required: false,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    order!: number;
}
