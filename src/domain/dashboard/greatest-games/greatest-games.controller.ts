import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GreatestGamesService } from './greatest-games.service';
import { CreateGreatestGameDto } from './dto/create-greatest-game.dto';
import { UpdateGreatestGameDto } from './dto/update-greatest-game.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('greatest-games')
@ApiTags('Greatest-games')
export class GreatestGamesController {
  constructor(private readonly greatestGamesService: GreatestGamesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  create(@Body() createGreatestGameDto: CreateGreatestGameDto) {
    return this.greatestGamesService.create(createGreatestGameDto);
  }

  @Get()
  findAll() {
    // sort by created date
    return this.greatestGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.greatestGamesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateGreatestGameDto: UpdateGreatestGameDto) {
    return this.greatestGamesService.update(id, updateGreatestGameDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.greatestGamesService.remove(id);
  }
}
