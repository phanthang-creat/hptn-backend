import { Injectable } from '@nestjs/common';
// import { CreatefooterDto } from './dto/create-footer-1.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Footer } from './entities/footer.entity';
import { Model } from 'mongoose';

@Injectable()
export class FooterService {
  constructor(
    @InjectModel(Footer.name) private readonly footerModel: Model<Footer>,
  ) {}

  async create(createfooterDto: any) {
    const currentFooter = await this.footerModel.findOne({});
    if (currentFooter) {
      return this.footerModel.findByIdAndUpdate(
        currentFooter._id,
        createfooterDto,
      );
    }

    return this.footerModel.create(createfooterDto);
  }

  async findAll() {
    const footer = await this.footerModel.find({});

    return footer.length > 0 ? footer[0] : '';
  }

  findOne(id: number) {
    return this.footerModel.findById(id);
  }

  async update(_updatefooterDto: UpdateFooterDto) {
    const currentFooter = await this.footerModel.findOne({});
    if (currentFooter) {
      return await this.footerModel.findByIdAndUpdate(
        currentFooter._id,
        _updatefooterDto,
      );
    } else {
      return await this.footerModel.create(_updatefooterDto);
    }
  }

  remove(id: string) {
    return this.footerModel.findByIdAndDelete(id);
  }
}
