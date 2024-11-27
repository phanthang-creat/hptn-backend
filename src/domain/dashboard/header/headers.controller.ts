import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { HeadersService } from './headers.service';
// import { CreateHeaderDto } from './dto/create-header-1.dto';
// import { UpdateHeaderDto } from './dto/update-header.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@ApiTags('headers')
@Controller('headers')
export class HeadersController {
  constructor(private readonly headersService: HeadersService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  // @ApiBody({ type: 'object' })
  // @ApiBearerAuth()
  // create(@Body() createHeaderDto: any) {
  //   return this.headersService.create(createHeaderDto);
  // }

  @Get()
  findAll() {
    return this.headersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.headersService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiBody({ type: 'object' })
  @Patch()
  update(@Body() updateHeaderDto: any) {
    return this.headersService.update(updateHeaderDto);
  }

  // @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  // @ApiBearerAuth()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.headersService.remove(id);
  // }
}
