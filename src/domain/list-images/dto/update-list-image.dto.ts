import { PartialType } from '@nestjs/swagger';
import { CreateListImageDto } from './create-list-image.dto';

export class UpdateListImageDto extends PartialType(CreateListImageDto) {}
