import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from '../entities/class.entity';
import { ConflictException } from '@nestjs/common/exceptions';
@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const result = await this.classRepository.find({
      where: {
        name: ILike(createClassDto.name),
        schoolYear: ILike(createClassDto.schoolYear),
      },
    });

    if (result.length > 0) {
      throw new ConflictException('This class is already exist');
    }
    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  async searchByQuery(name?: string, schoolYear?: string) {
    const whereClause = {
      name: name ? ILike(`%${name}%`) : undefined,
      schoolYear: schoolYear ? ILike(`%${schoolYear}%`) : undefined,
    };
    const result = await this.classRepository.find({
      where: whereClause,
    });
    if (result.length === 0) {
      throw new NotFoundException('No result found');
    }
    return result;
  }
  async findAll() {
    return await this.classRepository.find({});
  }

  async findById(id: string) {
    const classes = await this.classRepository.find({
      where: { id },
      relations: {
        teacher: true,
        students: true,
      },
    });
    if (classes.length === 0) {
      throw new NotFoundException('Class not found');
    }
    return classes;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const newClass = await this.classRepository.findOne({ where: { id } });
    if (!newClass) {
      throw new NotFoundException('Class not found');
    }
    Object.assign(newClass, updateClassDto);
    return this.classRepository.save(newClass);
  }

  async remove(id: string) {
    const classes = await this.classRepository.findOne({ where: { id } });
    if (!classes) {
      throw new NotFoundException('Class not found');
    }
    return await this.classRepository.softRemove(classes);
  }
}
