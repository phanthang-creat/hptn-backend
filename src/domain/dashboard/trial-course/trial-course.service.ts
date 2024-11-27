import { Injectable } from '@nestjs/common';
import { CreateTrialCourseDto } from './dto/create-trial-course.dto';
import { UpdateTrialCourseDto } from './dto/update-trial-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrialCourse } from './entities/trial-course.entity';

@Injectable()
export class TrialCourseService {

  constructor(
    @InjectRepository(TrialCourse)
    private readonly trialCourseRepository: Repository<TrialCourse>,
  ) {}

  create(createTrialCourseDto: CreateTrialCourseDto) {
    const trialCourse = this.trialCourseRepository.create(createTrialCourseDto);
    return this.trialCourseRepository.save(trialCourse);
  }

  findAll() {
    return this.trialCourseRepository.find();
  }

  findOne(id: number) {
    return this.trialCourseRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateTrialCourseDto: UpdateTrialCourseDto) {
    return this.trialCourseRepository.update(id, updateTrialCourseDto);
  }

  remove(id: number) {
    return this.trialCourseRepository.delete(id);
  }
}
