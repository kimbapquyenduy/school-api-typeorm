import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { EntityManager, Repository } from 'typeorm';
import { Teacher } from './entities/teacher';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    return await this.teacherRepository.save(newTeacher);
  }

  async findAll() {
    return await this.teacherRepository.find({
      relations: {
        class: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.teacherRepository.find({
      where: { id },
    });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new error();
    }
    Object.assign(teacher, updateTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: string) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new error();
    }
    return await this.teacherRepository.remove(teacher);
  }
}
