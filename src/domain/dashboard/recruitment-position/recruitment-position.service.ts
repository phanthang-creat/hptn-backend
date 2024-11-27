import { Injectable } from '@nestjs/common';
import { CreateRecruitmentPositionDto } from './dto/create-recruitment-position.dto';
import { UpdateRecruitmentPositionDto } from './dto/update-recruitment-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitmentPosition } from './entities/recruitment-position.entity';

@Injectable()
export class RecruitmentPositionService {
  constructor(
    @InjectRepository(RecruitmentPosition)
    private recruitmentPositionRepository: Repository<RecruitmentPosition>,
  ) {}

  create(createRecruitmentPositionDto: CreateRecruitmentPositionDto) {
    const reruimentPosition = this.recruitmentPositionRepository.create(
      createRecruitmentPositionDto,
    );
    return this.recruitmentPositionRepository.save(reruimentPosition);
  }

  findAll() {
    return this.recruitmentPositionRepository.find();
  }

  findOne(id: number) {
    return this.recruitmentPositionRepository.findOne({
      where: { id },
    });
  }

  update(
    id: number,
    updateRecruitmentPositionDto: UpdateRecruitmentPositionDto,
  ) {
    return this.recruitmentPositionRepository.update(
      id,
      updateRecruitmentPositionDto,
    );
  }

  remove(id: number) {
    this.recruitmentPositionRepository.delete(id);
  }
}
