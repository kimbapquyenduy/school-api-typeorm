import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  async findAll() {
    return await this.classRepository.find({
      relations: {
        teacher: true,
        students: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.classRepository.find({
      where: { id },
    });
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const newClass = await this.classRepository.findOne({ where: { id } });
    if (!newClass) {
      throw new Error();
    }
    Object.assign(newClass, updateClassDto);
    return this.classRepository.save(newClass);
  }

  async remove(id: string) {
    const newClass = await this.classRepository.findOne({ where: { id } });
    if (!newClass) {
      throw new Error();
    }
    return this.classRepository.remove(newClass);
  }
}
