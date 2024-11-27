import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';
import { PageDto } from 'src/common/dto/pagination/page-dto';
import { SelectPostDto } from './dto/select-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(query: SelectPostDto) {
    const [items, total] = await this.postRepository.findAndCount({
      skip: query.skip,
      take: query.take,
      select: [
        'id',
        'title',
        'slug',
        'image',
        'description',
        'shortContent',
        'enabled',
        'createdAt',
        'updatedAt',
      ],
      order: { createdAt: query.order },
      where: {
        enabled: query.enabled,
        id: Not(query.excludeSlug ? query.excludeSlug : ''),
      },
      // relations: ['category'],
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total,
    });

    return new PageDto(items, pageMetaDto);
  }

  findOne(id: string) {
    // return this.postRepository.findOne({
    //   where: { id },
    //   relations: ['category'],
    // });
    return this.postRepository.query(`SELECT * FROM posts WHERE id = ${id}`)
  }

  async findAllByCategorySlug(slug: string, query: FilterPostDto) {
    console.log('slug', slug);
    const [items, total] = await this.postRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.slug',
        'post.image',
        'post.description',
        'post.shortContent',
        'post.enabled',
        'post.createdAt',
        'post.updatedAt',
      ])
      .leftJoin('post.category', 'category')
      .where('category.slug = :postCategorySlug', { postCategorySlug: slug })
      .andWhere(
        `${
          query.enabled !== null && query.enabled !== undefined
            ? 'post.enabled = :enabled'
            : '1=1'
        }`,
        {
          enabled: query.enabled,
        },
      )
      .andWhere('post.title like :title', {
        title: query.title ? `%${query.title}%` : '%%',
      })
      .andWhere(`${query.minDate ? 'post.createdAt >= :minDate' : '1=1'}`, {
        minDate: query.minDate,
      })
      .andWhere(`${query.maxDate ? 'post.createdAt <= :maxDate' : '1=1'}`, {
        maxDate: query.maxDate,
      })
      .andWhere('post.slug != :slug', {
        slug: query.excludeSlug ? query.excludeSlug : '',
      })
      .skip(query.skip)
      .take(query.take)
      .orderBy('post.createdAt', query.order)
      .getManyAndCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total,
    });

    return new PageDto(items, pageMetaDto);
  }

  async findOneBySlug(slug: string) {
    return this.postRepository.findOne({
      where: { slug },
      relations: ['category'],
    });
  }

  update(id: string, _updatePostDto: UpdatePostDto) {
    return this.postRepository.update({ id }, _updatePostDto);
  }

  remove(id: string) {
    return this.postRepository.delete({ id });
  }

  async filter(query: FilterPostDto) {
    const [items, total] = await this.postRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.slug',
        'post.image',
        'post.description',
        'post.shortContent',
        'post.enabled',
        'post.createdAt',
        'post.updatedAt',
      ])
      .leftJoin('post.category', 'category')
      .where('post.title like :title', {
        title: query.title ? `%${query.title}%` : '%%',
      })
      .andWhere(
        `${
          query.postCategorySlug ? 'category.slug = :postCategorySlug' : '1=1'
        }`,
        {
          postCategorySlug: query.postCategorySlug,
        },
      )
      .andWhere(
        `${
          query.enabled !== null && query.enabled !== undefined
            ? 'post.enabled = :enabled'
            : '1=1'
        }`,
        {},
      )
      .andWhere(`${query.minDate ? 'post.createdAt >= :minDate' : '1=1'}`, {
        minDate: query.minDate,
      })
      .andWhere(`${query.maxDate ? 'post.createdAt <= :maxDate' : '1=1'}`, {
        maxDate: query.maxDate,
      })
      .skip(query.skip)
      .take(query.take)
      .orderBy('post.createdAt', query.order)
      .getManyAndCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total,
    });

    return new PageDto(items, pageMetaDto);
  }
}
