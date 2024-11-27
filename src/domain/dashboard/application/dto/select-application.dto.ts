import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PageOptionsDto } from "src/common/dto/pagination/page-options-dto";

export class SelectApplicationDto extends PageOptionsDto {

    @ApiProperty({ 
        name: 'recruitmentId',
        description: 'Recruitment id of the applicant',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    recruitmentId?: string;

    @ApiProperty({ 
        name: 'fullName',
        description: 'Full name of the applicant',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiProperty({ 
        name: 'email',
        description: 'Email of the applicant',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    email?: string;
}