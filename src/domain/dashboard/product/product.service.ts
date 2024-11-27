import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from '../product-image/entities/product-image.entity';
import { Transactional } from 'typeorm-transactional';
import { SelectProductDto } from './dto/select-product.dto';
import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';
import { PageDto } from 'src/common/dto/pagination/page-dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  @Transactional()
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    
    const newProduct = await this.productRepository.save(product);

    if (createProductDto.images.length > 0) {
      const imagesDto = createProductDto.images.map(image => {
        return {
          ...image,
          product: newProduct
        }
      });

      const images = this.productImageRepository.create(imagesDto);

      await this.productImageRepository.save(images);
    }

    return newProduct;

  }

  async findAll(query: SelectProductDto) {
    const [items, total] = await this.productRepository.createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.slug',
        'product.price',
        'product.image',
        'product.description',
        'product.shortContent',
        'product.enabled',
        'product.createdAt',
        'product.updatedAt',
      ])
      .leftJoinAndSelect('product.category', 'category')
      .where(`
        ${query.enabled !== null && query.enabled !== undefined ? 'product.enabled = :enabled' : '1=1'}
      `, { enabled: query.enabled })
      .andWhere(`
        ${query.excludeSlug ? 'product.slug != :excludeSlug' : '1=1'}
      `, { excludeSlug: query.excludeSlug })
      .skip(query.skip)
      .take(query.take)
      .orderBy('product.createdAt', query.order)
      .getManyAndCount();

      const pageMetaDto: PageMetaDto = new PageMetaDto({
        pageOptionsDto: query,
        itemCount: total
      })

      return new PageDto(items, pageMetaDto);

  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'images']
    });
  }

  findOneBySlug(slug: string) {
    return this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'images']
    });
  }

  @Transactional()
  async update(id: string, updateProductDto: UpdateProductDto) {

    if (updateProductDto.images && updateProductDto.images.length > 0) {
      const imagesDto = updateProductDto.images.map(image => {
        return {
          ...image,
          productId: id
        }
      });

      await this.productImageRepository.delete({ productId: id });

      const images = this.productImageRepository.create(imagesDto);

      await this.productImageRepository.save(images);

      delete updateProductDto.images;
    }

    if (updateProductDto) {
      console.log(updateProductDto);
    }

    return await this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
