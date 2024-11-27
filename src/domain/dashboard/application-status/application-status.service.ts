import { Injectable } from '@nestjs/common';
import { CreateApplicationStatusDto } from './dto/create-application-status.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationStatus } from './entities/application-status.entity';

@Injectable()
export class ApplicationStatusService {

  constructor(
    @InjectRepository(ApplicationStatus)
    private applicationStatusRepository: Repository<ApplicationStatus>,
  ) {}

  create(createApplicationStatusDto: CreateApplicationStatusDto) {
    const applicationStatus = this.applicationStatusRepository.create(createApplicationStatusDto);
    return this.applicationStatusRepository.save(applicationStatus);
  }

  findAll() {
    return this.applicationStatusRepository.find();
  }

  findOne(id: number) {
    return this.applicationStatusRepository.findOne({
      where: {
        id,
      }
    });
  }

  update(id: number, updateApplicationStatusDto: UpdateApplicationStatusDto) {
    return this.applicationStatusRepository.update(id, updateApplicationStatusDto);
  }

  remove(id: number) {
    return this.applicationStatusRepository.delete(id);
  }
}
