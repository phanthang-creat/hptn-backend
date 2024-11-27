import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrialRegistraionDto {
    @ApiProperty({ type: String, description: 'studentName'})
    @IsString()
    @IsNotEmpty()
    studentName!: string;

    @ApiProperty({ type: Number, description: 'studentAge'})
    @IsNotEmpty()
    @IsNumber()
    studentAge!: number;

    @ApiProperty({ type: String, description: 'parentName'})
    @IsString()
    @IsNotEmpty()
    parentName!: string;

    @ApiProperty({ type: String, description: 'parentPhone'})
    @IsString()
    @IsNotEmpty()
    parentPhone!: string;

    @ApiProperty({ type: Number, description: 'trialCourseId'})
    @IsNotEmpty()
    @IsNumber()
    trialCourseId!: number;
    
}
