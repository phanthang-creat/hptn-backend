import { Injectable } from '@nestjs/common';
import { CreateTrialRegistraionDto } from './dto/create-trial-registraion.dto';
import { UpdateTrialRegistraionDto } from './dto/update-trial-registraion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrialRegistraion } from './entities/trial-registraion.entity';
import { SelectTrialRegistraionDto } from './dto/select-trail-registration.dto';
import { PageDto } from 'src/common/dto/pagination/page-dto';
import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';

@Injectable()
export class TrialRegistraionService {

  constructor(
    @InjectRepository(TrialRegistraion)
    private readonly trialRegistraionRepository: Repository<TrialRegistraion>,
  ) {}

  async create(createTrialRegistraionDto: CreateTrialRegistraionDto) {

    
    const trialRegistraion = this.trialRegistraionRepository.create(createTrialRegistraionDto);
    
    const newTrialRegistraion = await this.trialRegistraionRepository.save(trialRegistraion);

    return newTrialRegistraion;
  }

  async findAll(query: SelectTrialRegistraionDto) {
    const [items, total] = await this.trialRegistraionRepository
    .createQueryBuilder('trialRegistraion')
    .leftJoin('trialRegistraion.trialCourse', 'trialCourse')
    .where(`
      ${query.studentName ? `trialRegistraion.studentName like :studentName` : '1=1'}
    `, {
      studentName: `%${query.studentName}%`,
    })
    .andWhere(`
      ${query.parentPhone ? `trialRegistraion.studentPhone like :studentPhone` : '1=1'}
    `, {
      studentPhone: `%${query.parentPhone}%`,
    })
    .andWhere(`
      ${query.parentName ? `trialRegistraion.parentName like :parentName` : '1=1'}
    `, {
      parentName: `%${query.parentName}%`,
    })
    .andWhere(`
      ${query.trialCourseId ? `trialCourse.id = :trialCourseId` : '1=1'}
    `, {
      trialCourseId: query.trialCourseId,
    })
    .skip(query.skip)
    .take(query.take)
    .getManyAndCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total,
    });

    return new PageDto(items, pageMetaDto);
  }

  findOne(id: string) {
    return this.trialRegistraionRepository.findOne({
      where: { id },
      relations: ['trialCourse'],
    });
  }

  update(id: string, updateTrialRegistraionDto: UpdateTrialRegistraionDto) {
    return this.trialRegistraionRepository.update(id, updateTrialRegistraionDto);
  }

  remove(id: string) {
    return this.trialRegistraionRepository.delete(id);
  }
}
