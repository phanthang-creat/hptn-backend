import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { uuidv7 } from 'uuidv7';
import dataSource from 'src/config/database/migrations/config/datasource';
import { sortTreeHelper } from 'src/common/helper/sortTree';
// import { ProductCategoryClosureEntity } from './entities/product-category-closure.entity';

@Injectable()
export class ProductCategoryService {

  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
    // @InjectRepository(ProductCategoryClosureEntity)
    // private productCategoryClosureRepository: Repository<ProductCategoryClosureEntity>,
  ) { }

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategory = this.productCategoryRepository.create(createProductCategoryDto);

    productCategory.id = uuidv7();

    if (createProductCategoryDto.parentId) {
      productCategory.parent = await this.productCategoryRepository.findOne({
        where: {
          id: createProductCategoryDto.parentId,
        },
      });

      if (!productCategory.parent) {
        throw new BadRequestException('Parent category not found');
      }
    }

    return this.productCategoryRepository.save(productCategory);
  }

  async findAll() {
    const treeRepository = dataSource.manager.getTreeRepository(ProductCategory);

    const trees = await treeRepository.findTrees();

    return sortTreeHelper(trees);
    
  }

  async findOne(id: string) {
    const parent = await this.productCategoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    const trees = dataSource.manager.getTreeRepository(ProductCategory);

    const tree = await trees.findDescendantsTree(parent);

    return tree;
  }

  async findOneBySlug(slug: string) {
    const parent = await this.productCategoryRepository.findOne({
      where: {
        slug,
      },
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    const trees = dataSource.manager.getTreeRepository(ProductCategory);

    const tree = await trees.findDescendantsTree(parent);

    return tree;
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    // const productCategory = this.productCategoryRepository.create(updateProductCategoryDto);

    // if (updateProductCategoryDto.parentId) {
    //   productCategory.parent = await this.productCategoryRepository.findOne({
    //     where: {
    //       id: updateProductCategoryDto.parentId,
    //     },
    //   });

    //   if (!productCategory.parent) {
    //     throw new BadRequestException('Parent category not found');
    //   }

    //   const productCategoryClosure = new ProductCategoryClosureEntity();

    //   productCategoryClosure.ancestorid = productCategory.parent.id;
    //   productCategoryClosure.descendantid = id;

    //   await this.productCategoryClosureRepository.delete({
    //     descendantid: id,
    //     ancestorid: Not(id),
    //   });

    //   await this.productCategoryClosureRepository.save(productCategoryClosure);
    // }

    // console.log(productCategory);

    return this.productCategoryRepository.update(id, updateProductCategoryDto);
  }

  remove(id: string) {
    return this.productCategoryRepository.delete(id);
  }
}
