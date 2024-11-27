import { Recruitment } from './../recruitment/entities/recruitment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { SelectApplicationDto } from './dto/select-application.dto';
import { PageDto } from 'src/common/dto/pagination/page-dto';
import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';

@Injectable()
export class ApplicationService {

  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const recruitment = await this.recruitmentRepository.findOne({
      where: {
        id: createApplicationDto.recruitmentId,
      }
    })

    if (!recruitment || !recruitment.enabled) {
      throw new NotFoundException('Recruitment not found');
    }

    const application = this.applicationRepository.create(createApplicationDto);

    return await this.applicationRepository.save(application);
  }

  async findAll(query: SelectApplicationDto) {
    const [items, total] = await this.applicationRepository
    .createQueryBuilder('application')
    .addSelect([
      'recruitment.id',
      'recruitment.title',
      'recruitment.image',
    ])
    .leftJoin('application.recruitment', 'recruitment')
    .leftJoinAndSelect('recruitment.position', 'position')
    .leftJoinAndSelect('application.applicationStatus', 'applicationStatus')
    .where(`
      ${query.recruitmentId ? 'application.recruitmentId = :recruitmentId' : '1=1'}
      ${query.fullName ? 'AND application.fullName LIKE :fullName' : ''}
      ${query.email ? 'AND application.email LIKE :email' : ''}
    `, {
      recruitmentId: query.recruitmentId,
      fullName: `%${query.fullName}%`,
      email: `%${query.email}%`,
    })
    .skip(query.skip)
    .take(query.take)
    .getManyAndCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total
    })

    return new PageDto(items, pageMetaDto);

  }

  findOne(id: string) {
    return this.applicationRepository
    .createQueryBuilder('application')
    .select([
      'application.id',
      'application.fullName',
      'application.email',
      'application.phone',
      'application.address',
      'application.description',
      'application.dateOfBirth',
      'application.cv',
      'application.createdAt',
      'application.updatedAt',
      'recruitment.id',
      'recruitment.title',
      'recruitment.image',
    ])
    .leftJoin('application.recruitment', 'recruitment')
    .leftJoinAndSelect('recruitment.position', 'position')
    .where('application.id = :id', { id })
    .getOne();
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return this.applicationRepository.update(id, updateApplicationDto);
  }

  remove(id: string) {
    return this.applicationRepository.delete(id);
  }
}
