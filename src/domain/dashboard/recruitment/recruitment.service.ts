import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { uuidv7 } from 'uuidv7';
import { FilterRecruitmentDto } from './dto/filter-recruitment.dto';
import { PageMetaDto } from 'src/common/dto/pagination/page-meta-dto';
import { PageDto } from 'src/common/dto/pagination/page-dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
  ) {}

  create(createRecruitmentDto: CreateRecruitmentDto) {
    const reruiment = this.recruitmentRepository.create(createRecruitmentDto);

    reruiment.id = uuidv7();

    return this.recruitmentRepository.save(reruiment);
  }

  async findAll(query: FilterRecruitmentDto) {
    const [items, total] = await this.recruitmentRepository
      .createQueryBuilder('recruitment')
      .select([
        'recruitment.id',
        'recruitment.title',
        'recruitment.slug',
        'recruitment.address',
        'recruitment.description',
        'recruitment.shortContent',
        'recruitment.createdAt',
        'recruitment.updatedAt',
        'recruitment.enabled',
        'recruitment.typeId',
        'recruitment.positionId',
        'recruitment.image',
        // 'recruitmentType.id',
        // 'recruitmentType.name',
        // 'recruitmentType.slug',
        // 'recruitmentPosition.id',
        // 'recruitmentPosition.name',
        // 'recruitmentPosition.slug',
      ])
      .leftJoinAndSelect('recruitment.type', 'recruitmentType')
      .leftJoinAndSelect('recruitment.position', 'recruitmentPosition')
      .where(`${query.title ? 'recruitment.title LIKE :title' : '1=1'}`, {
        title: `%${query.title}%`,
      })
      .andWhere(
        `${
          query.recruitmentTypeId
            ? 'recruitmentType.id = :recruitmentTypeId'
            : '1=1'
        }`,
        { recruitmentTypeId: query.recruitmentTypeId },
      )
      .andWhere(
        `${
          query.recruitmentPositionId
            ? 'recruitmentPosition.id = :recruitmentPositionId'
            : '1=1'
        }`,
        { recruitmentPositionId: query.recruitmentPositionId },
      )
      .andWhere(
        `${query.address ? 'recruitment.address LIKE :address' : '1=1'}`,
        { address: `%${query.address}%` },
      )
      .andWhere(
        `${
          query.enabled !== undefined && query.enabled !== null
            ? 'recruitment.enabled = :enabled'
            : '1=1'
        }`,
        { enabled: query.enabled },
      )
      .andWhere(
        `${query.excludeSlug ? 'recruitment.slug != :excludeSlug' : '1=1'}`,
        { excludeSlug: `${query.excludeSlug}` },
      )
      .skip(query.skip)
      .take(query.take)
      .orderBy('recruitment.createdAt', 'DESC')
      .getManyAndCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      pageOptionsDto: query,
      itemCount: total,
    });

    return new PageDto(items, pageMetaDto);
  }

  findOne(id: string) {
    return this.recruitmentRepository.findOne({
      where: { id },
      relations: ['type', 'position'],
    });
  }

  findBySlug(slug: string) {
    return this.recruitmentRepository.findOne({
      where: { slug },
      relations: ['type', 'position'],
    });
  }

  update(id: string, updateRecruitmentDto: UpdateRecruitmentDto) {
    return this.recruitmentRepository.update(id, updateRecruitmentDto);
  }

  remove(id: string) {
    this.recruitmentRepository.delete(id);
  }
}
