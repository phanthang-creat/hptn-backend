import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";
import { PageOptionsDto } from "src/common/dto/pagination/page-options-dto";

export class SelectTrialRegistraionDto extends PageOptionsDto {
    @ApiProperty({ type: Number, description: 'studentName'})
    @IsString()
    @IsOptional()
    studentName!: string;

    @ApiProperty({ type: Number, description: 'studentAge'})
    @IsOptional()
    studentAge!: number;

    @ApiProperty({ type: String, description: 'parentName'})
    @IsString()
    @IsOptional()
    parentName!: string;

    @ApiProperty({ type: String, description: 'parentPhone'})
    @IsString()
    @IsOptional()
    parentPhone!: string;

    @ApiProperty({ type: Number, description: 'trialCourseId'})
    @IsOptional()
    @IsNumber()
    trialCourseId!: number;
    
}