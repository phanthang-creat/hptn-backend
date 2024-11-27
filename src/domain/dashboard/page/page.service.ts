import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageDocument } from './entities/page.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('Page') private readonly pageModel: Model<PageDocument>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const check = await this.pageModel.findOne({ code: createPageDto.code });

    if (check) {
      throw new BadRequestException('Code is exists');
    }

    return this.pageModel.create(createPageDto);
  }

  findAll() {
    return this.pageModel.find().select('_id code name link').exec();
  }

  findOne(id: string) {
    return this.pageModel.findOne({ code: id }).exec();
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return this.pageModel.updateOne({ _id: id }, updatePageDto).exec();
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.pageModel.deleteOne({ _id: id }).exec();

    return {
      affected: result.deletedCount,
      raw: result,
    };
  }
}
