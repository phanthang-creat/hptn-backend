import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Role } from 'src/common/enums';
import { Roles } from 'src/authentication/roles.decorator';
import { SelectPostDto } from './dto/select-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() query: SelectPostDto) {
    return this.postService.findAll(query);
  }

  @Get('post-category/:slug')
  findAllByCategorySlug(
    @Param('slug') slug: string,
    @Query() query: FilterPostDto,
  ) {
    return this.postService.findAllByCategorySlug(slug, query);
  }

  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.postService.findOneBySlug(slug);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('search')
  search(@Query() query: FilterPostDto) {
    return this.postService.filter(query);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
