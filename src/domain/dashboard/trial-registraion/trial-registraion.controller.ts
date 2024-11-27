import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TrialRegistraionService } from './trial-registraion.service';
import { CreateTrialRegistraionDto } from './dto/create-trial-registraion.dto';
import { UpdateTrialRegistraionDto } from './dto/update-trial-registraion.dto';
import { SelectTrialRegistraionDto } from './dto/select-trail-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Role } from 'src/common/enums';
import { Roles } from 'src/authentication/roles.decorator';

@Controller('trial-registraion')
@ApiTags('TrialRegistraion')
export class TrialRegistraionController {
  constructor(private readonly trialRegistraionService: TrialRegistraionService) {}

  @Post()
  create(@Body() createTrialRegistraionDto: CreateTrialRegistraionDto) {
    return this.trialRegistraionService.create(createTrialRegistraionDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  findAll(@Query() query: SelectTrialRegistraionDto) {
    return this.trialRegistraionService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.trialRegistraionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTrialRegistraionDto: UpdateTrialRegistraionDto) {
    return this.trialRegistraionService.update(id, updateTrialRegistraionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.trialRegistraionService.remove(id);
  }
}
