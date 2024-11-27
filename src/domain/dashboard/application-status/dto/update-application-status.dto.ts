import { PartialType } from '@nestjs/swagger';
import { CreateApplicationStatusDto } from './create-application-status.dto';

export class UpdateApplicationStatusDto extends PartialType(CreateApplicationStatusDto) {}
