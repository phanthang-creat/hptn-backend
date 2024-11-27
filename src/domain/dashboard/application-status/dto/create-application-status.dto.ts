import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateApplicationStatusDto {
    @ApiProperty({ name: 'name', description: 'Name of the application status', type: String, required: true })
    @IsNotEmpty()
    @IsNotEmpty()
    name!: string;
}
