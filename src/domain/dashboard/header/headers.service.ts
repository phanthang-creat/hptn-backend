import { Injectable } from '@nestjs/common';
// import { CreateHeaderDto } from './dto/create-header-1.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Header } from './entities/header.entity';
import { Model } from 'mongoose';

@Injectable()
export class HeadersService {
  constructor(
    @InjectModel(Header.name) private readonly headerModel: Model<Header>,
  ) {}

  async create(createHeaderDto: any) {
    const currentHeader = await this.headerModel.findOne({});
    if (currentHeader) {
      return this.headerModel.findByIdAndUpdate(
        currentHeader._id,
        createHeaderDto,
      );
    }

    return this.headerModel.create(createHeaderDto);
  }

  async findAll() {
    const headers = await this.headerModel.find({});

    return headers.length > 0 ? headers[0] : '';
  }

  findOne(id: number) {
    return this.headerModel.findById(id);
  }

  async update(_updateHeaderDto: UpdateHeaderDto) {
    const currentHeader = await this.headerModel.findOne({});
    if (currentHeader) {
      return await this.headerModel.findByIdAndUpdate(
        currentHeader._id,
        _updateHeaderDto,
      );
    } else {
      return await this.headerModel.create(_updateHeaderDto);
    }

    // return this.headerModel.findByIdAndUpdate(id, _updateHeaderDto);
  }

  remove(id: string) {
    return this.headerModel.findByIdAndDelete(id);
  }
}
