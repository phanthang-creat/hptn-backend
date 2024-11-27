import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateListImageDto {
    @ApiProperty({
        type: 'string',
        description: 'The url of the image'
    })
    @IsNotEmpty()
    @IsString()
    url!: string;
}
