import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrialCourseService } from './trial-course.service';
import { CreateTrialCourseDto } from './dto/create-trial-course.dto';
import { UpdateTrialCourseDto } from './dto/update-trial-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('trial-course')
@ApiTags('Trial-course')
export class TrialCourseController {
  constructor(private readonly trialCourseService: TrialCourseService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  create(@Body() createTrialCourseDto: CreateTrialCourseDto) {
    return this.trialCourseService.create(createTrialCourseDto);
  }

  @Get()
  findAll() {
    return this.trialCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trialCourseService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTrialCourseDto: UpdateTrialCourseDto) {
    return this.trialCourseService.update(+id, updateTrialCourseDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.trialCourseService.remove(+id);
  }
}
