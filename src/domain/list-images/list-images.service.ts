import { Injectable } from '@nestjs/common';
import { CreateListImageDto } from './dto/create-list-image.dto';
import { UpdateListImageDto } from './dto/update-list-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListImage } from './entities/list-image.entity';

@Injectable()
export class ListImagesService {

  constructor(
    @InjectRepository(ListImage)
    private listImageRepository: Repository<ListImage>,
  ) {}

  create(createListImageDto: CreateListImageDto) {
    const listImage = this.listImageRepository.create(createListImageDto);
    return this.listImageRepository.save(listImage);
  }

  findAll() {
    return this.listImageRepository.find();
  }

  findOne(id: number) {
    return this.listImageRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateListImageDto: UpdateListImageDto) {
    return this.listImageRepository.update(id, updateListImageDto);
  }

  remove(id: number) {
    return this.listImageRepository.delete(id);
  }
}
