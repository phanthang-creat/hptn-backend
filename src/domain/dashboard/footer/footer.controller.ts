import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { FooterService } from './footer.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enums';

@ApiTags('footers')
@Controller('footers')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  // @Post()
  // @UseGuards(AuthGuard)s
  // @Roles(Role.ADMIN)
  // @ApiBody({ type: 'object' })
  // @ApiBearerAuth()
  // create(@Body() createFooterDto: any) {
  //   return this.footerService.create(createFooterDto);
  // }

  @Get()
  findAll() {
    return this.footerService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.footerService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiBody({ type: 'object' })
  @Patch()
  update(@Body() updateFooterDto: any) {
    return this.footerService.update(updateFooterDto);
  }

  // @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  // @ApiBearerAuth()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.footerService.remove(id);
  // }
}
