import { PartialType } from '@nestjs/swagger';
import { CreateRecruitmentTypeDto } from './create-recruitment-type.dto';

export class UpdateRecruitmentTypeDto extends PartialType(
  CreateRecruitmentTypeDto,
) {}
