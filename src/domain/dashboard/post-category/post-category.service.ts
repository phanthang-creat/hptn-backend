import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { PostCategoryEntity } from './entities/post-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional, runOnTransactionCommit } from 'typeorm-transactional';
// import { PostCategoryClosureEntity } from './entities/post-category-closure.entity';
import dataSource from 'src/config/database/migrations/config/datasource';
import { sortTreeHelper } from 'src/common/helper/sortTree';
import { PostCategoryImage } from '../post-category-image/entities/post-category-image.entity';
// import { PageDto } from 'src/common/dto/pagination/page-dto';
// import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';

@Injectable()
export class PostCategoryService {
  constructor(
    @InjectRepository(PostCategoryEntity)
    private readonly postCategoryRepository: Repository<PostCategoryEntity>, 
    @InjectRepository(PostCategoryImage)
    private readonly postCategoryImageRepository: Repository<PostCategoryImage>,
    // @InjectRepository(PostCategoryClosureEntity) // private readonly postCategoryClosureRepository: Repository<PostCategoryClosureEntity>,
  ) {}

  @Transactional()
  async create(createPostCategoryDto: CreatePostCategoryDto) {
    const postCategoryEntity = this.postCategoryRepository.create(
      createPostCategoryDto,
    );

    if (createPostCategoryDto.parentId) {
      postCategoryEntity.parent = await this.postCategoryRepository.findOne({
        where: {
          id: createPostCategoryDto.parentId,
        },
      });
      if (!postCategoryEntity.parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    const newPostCategory = await this.postCategoryRepository.save(
      postCategoryEntity,
    );

    if (createPostCategoryDto.images.length > 0) {
      const imagesDto = createPostCategoryDto.images.map(image => {
        return {
          ...image,
          postCategory: newPostCategory
        }
      });

      const images = this.postCategoryImageRepository.create(imagesDto);

      await this.postCategoryImageRepository.save(images);
    }

    runOnTransactionCommit(() => {
      Logger.log('Transaction for create post category committed');
    });
  
    return newPostCategory;
  }

  async findAll() {
    const treeRepository =
      dataSource.manager.getTreeRepository(PostCategoryEntity);

    const trees = await treeRepository.findTrees();

    return sortTreeHelper(trees);
  }

  async findOne(id: string) {
    const parent = await this.postCategoryRepository.findOne({
      where: {
        id,
      },
      relations: ['images'],
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    const trees = dataSource.manager.getTreeRepository(PostCategoryEntity);

    const tree = await trees.findDescendantsTree(parent, {
      relations: ['images'],
    });

    return tree;
  }

  async findOneBySlug(slug: string) {
    const parent = await this.postCategoryRepository.findOne({
      where: {
        slug,
      },
      relations: ['images'],
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    const trees = dataSource.manager.getTreeRepository(PostCategoryEntity);

    const tree = await trees.findDescendantsTree(parent, {
      relations: ['images'],
    });

    return tree;
  }

  @Transactional()
  async update(id: string, updatePostCategoryDto: UpdatePostCategoryDto) {
    // if (updatePostCategoryDto.parentId) {
    //   if (updatePostCategoryDto.parentId === id) {
    //     throw new BadRequestException('Parent category cannot be itself');
    //   } else {
    //     const parent = await this.postCategoryRepository.findOne({
    //       where: {
    //         id: updatePostCategoryDto.parentId,
    //       },
    //     });

    //     if (!parent) {
    //       throw new BadRequestException('Parent category not found');
    //     }

    //     const postCategory = await this.postCategoryRepository.findOne({
    //       where: {
    //         id,
    //       },
    //     });

    //     if (!postCategory) {
    //       throw new BadRequestException('Category not found');
    //     }

    //     postCategory.parent = parent;

    //     return this.postCategoryRepository.save(postCategory);
    //   } 
    // }
    if (updatePostCategoryDto.parentId) {
      if (updatePostCategoryDto.parentId === id) {
        throw new BadRequestException('Parent category cannot be itself');
      } else {
        const parent = await this.postCategoryRepository.findOne({
          where: {
            id: updatePostCategoryDto.parentId,
          },
        });

        if (!parent) {
          throw new BadRequestException('Parent category not found');
        }

        const postCategory = await this.postCategoryRepository.findOne({
          where: {
            id,
          },
        });

        if (!postCategory) {
          throw new BadRequestException('Category not found');
        }
      }
    }
    
    if (updatePostCategoryDto.images) {
      // if(updatePostCategoryDto.images.length > 0) {
      const postCategoryImages = updatePostCategoryDto.images?.map((image) => {
        const postCategoryImage = this.postCategoryImageRepository.create({
          image: image.image,
          postCategoryId: id,
        });
        
        return postCategoryImage;
      });

      await this.postCategoryImageRepository.delete({
        postCategoryId: id
      });

      await this.postCategoryImageRepository.save(postCategoryImages);
      // }
      delete updatePostCategoryDto.images;
  }

    return this.postCategoryRepository.update(id, updatePostCategoryDto);
  }

  remove(id: string) {
    return this.postCategoryRepository.delete(id);
  }
}
