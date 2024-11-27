import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListImagesService } from './list-images.service';
import { CreateListImageDto } from './dto/create-list-image.dto';
import { UpdateListImageDto } from './dto/update-list-image.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('list-images')
@ApiTags('List Images')
export class ListImagesController {
  constructor(private readonly listImagesService: ListImagesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  create(@Body() createListImageDto: CreateListImageDto) {
    return this.listImagesService.create(createListImageDto);
  }

  @Get()
  findAll() {
    return this.listImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listImagesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateListImageDto: UpdateListImageDto) {
    return this.listImagesService.update(+id, updateListImageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.listImagesService.remove(+id);
  }
}
