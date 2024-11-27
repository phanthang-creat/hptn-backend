import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {

    @ApiProperty({
        name: 'status',
        description: 'Status of the application',
        type: Number,
        required: false
    })
    @IsNumber()
    @IsOptional()
    status?: number;
}
