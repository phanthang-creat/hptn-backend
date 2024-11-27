import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecruitmentTypeService } from './recruitment-type.service';
import { CreateRecruitmentTypeDto } from './dto/create-recruitment-type.dto';
import { UpdateRecruitmentTypeDto } from './dto/update-recruitment-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('recruitment-type')
@ApiTags('Recruitment-type')
export class RecruitmentTypeController {
  constructor(
    private readonly recruitmentTypeService: RecruitmentTypeService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createRecruitmentTypeDto: CreateRecruitmentTypeDto) {
    return this.recruitmentTypeService.create(createRecruitmentTypeDto);
  }

  @Get()
  findAll() {
    return this.recruitmentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentTypeService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentTypeDto: UpdateRecruitmentTypeDto,
  ) {
    return this.recruitmentTypeService.update(+id, updateRecruitmentTypeDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentTypeService.remove(+id);
  }
}
