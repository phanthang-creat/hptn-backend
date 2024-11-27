import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApplicationStatusService } from './application-status.service';
import { CreateApplicationStatusDto } from './dto/create-application-status.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('application-status')
@ApiTags('Application Status')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class ApplicationStatusController {
  constructor(private readonly applicationStatusService: ApplicationStatusService) {}

  @Post()
  create(@Body() createApplicationStatusDto: CreateApplicationStatusDto) {
    return this.applicationStatusService.create(createApplicationStatusDto);
  }

  @Get()
  findAll() {
    return this.applicationStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationStatusDto: UpdateApplicationStatusDto) {
    return this.applicationStatusService.update(+id, updateApplicationStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationStatusService.remove(+id);
  }
}
