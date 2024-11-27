import { PartialType } from '@nestjs/swagger';
import { CreateTrialRegistraionDto } from './create-trial-registraion.dto';

export class UpdateTrialRegistraionDto extends PartialType(CreateTrialRegistraionDto) {}
