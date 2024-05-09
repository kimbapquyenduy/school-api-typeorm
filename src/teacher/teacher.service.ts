import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { EntityManager, ILike, Repository } from 'typeorm';
import { Teacher } from '../entities/teacher';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import validator from 'validator';
import { SearchByQueryDto } from 'src/proto/teacher';

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
    return { teacher: await this.teacherRepository.find({}) };
  }
  async searchByQuery(SearchByQueryDto: SearchByQueryDto) {
    const whereClause = {
      firstName: SearchByQueryDto.firstName
        ? ILike(`%${SearchByQueryDto.firstName}%`)
        : undefined,
      lastName: SearchByQueryDto.lastName
        ? ILike(`%${SearchByQueryDto.lastName}%`)
        : undefined,
      gender: SearchByQueryDto.gender
        ? ILike(SearchByQueryDto.gender)
        : undefined,
      specialize: SearchByQueryDto.specialize
        ? ILike(`%${SearchByQueryDto.specialize}%`)
        : undefined,
    };

    const result = await this.teacherRepository.find({
      where: whereClause,
      relations: {
        class: true,
      },
    });

    if (result.length === 0) {
      throw new NotFoundException('No result found');
    }
    return { teacher: result };
  }

  async findById(id: string) {
    const teacher = await this.teacherRepository.find({
      where: { id },
      relations: {
        class: true,
      },
    });
    if (teacher.length === 0) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    Object.assign(teacher, updateTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async removeF(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['class'],
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return await this.teacherRepository.softRemove(teacher);
  }
  async remove(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    await this.teacherRepository.save({
      id: teacher.id,
      classId: null,
    });
    return await this.teacherRepository.softRemove(teacher);
  }
}
