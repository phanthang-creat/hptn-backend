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
import { RecruitmentPositionService } from './recruitment-position.service';
import { CreateRecruitmentPositionDto } from './dto/create-recruitment-position.dto';
import { UpdateRecruitmentPositionDto } from './dto/update-recruitment-position.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('recruitment-position')
@ApiTags('Recruitment-position')
export class RecruitmentPositionController {
  constructor(
    private readonly recruitmentPositionService: RecruitmentPositionService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  create(@Body() createRecruitmentPositionDto: CreateRecruitmentPositionDto) {
    return this.recruitmentPositionService.create(createRecruitmentPositionDto);
  }

  @Get()
  findAll() {
    return this.recruitmentPositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentPositionService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentPositionDto: UpdateRecruitmentPositionDto,
  ) {
    return this.recruitmentPositionService.update(
      +id,
      updateRecruitmentPositionDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.recruitmentPositionService.remove(+id);
  }
}
