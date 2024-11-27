import { PartialType } from '@nestjs/swagger';
import { CreateGreatestGameDto } from './create-greatest-game.dto';

export class UpdateGreatestGameDto extends PartialType(CreateGreatestGameDto) {}
