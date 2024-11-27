import { PartialType } from '@nestjs/swagger';
import { CreateTrialCourseDto } from './create-trial-course.dto';

export class UpdateTrialCourseDto extends PartialType(CreateTrialCourseDto) {}
