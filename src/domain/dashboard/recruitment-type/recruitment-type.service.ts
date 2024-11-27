import { Injectable } from '@nestjs/common';
import { CreateRecruitmentTypeDto } from './dto/create-recruitment-type.dto';
import { UpdateRecruitmentTypeDto } from './dto/update-recruitment-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruitmentType } from './entities/recruitment-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecruitmentTypeService {
  constructor(
    @InjectRepository(RecruitmentType)
    private recruitmentTypeRepository: Repository<RecruitmentType>,
  ) {}

  create(createRecruitmentTypeDto: CreateRecruitmentTypeDto) {
    const reruimentType = this.recruitmentTypeRepository.create(
      createRecruitmentTypeDto,
    );
    return this.recruitmentTypeRepository.save(reruimentType);
  }

  findAll() {
    return this.recruitmentTypeRepository.find();
  }

  findOne(id: number) {
    return this.recruitmentTypeRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateRecruitmentTypeDto: UpdateRecruitmentTypeDto) {
    return this.recruitmentTypeRepository.update(id, updateRecruitmentTypeDto);
  }

  remove(id: number) {
    this.recruitmentTypeRepository.delete(id);
  }
}
