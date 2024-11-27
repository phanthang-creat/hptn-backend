import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateApplicationDto {
    @ApiProperty({ name: 'fullName', description: 'Full name of the applicant', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @ApiProperty({ name: 'email', description: 'Email of the applicant', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    email!: string;

    @ApiProperty({ name: 'phone', description: 'Phone of the applicant', type: String, required: true, example: '0123456789' })
    @IsNotEmpty()
    @IsNumberString()
    phone!: string;

    @ApiProperty({ name: 'dateOfBirth', description: 'Date of birth of the applicant', type: Date, required: true })
    @IsNotEmpty()
    @IsDate()
    dateOfBirth!: Date;

    @ApiProperty({ name: 'address', description: 'Address of the applicant', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    address!: string;

    @ApiProperty({ name: 'cv', description: 'CV of the applicant', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    cv!: string;

    @ApiProperty({ name: 'recruitmentId', description: 'Recruitment id of the applicant', type: String, required: true })
    @IsNotEmpty()
    @IsString()
    recruitmentId!: string;

    @ApiProperty({ name: 'description', description: 'Description of the applicant', type: String, required: false })
    @IsString()
    @IsOptional()
    description?: string;
}
