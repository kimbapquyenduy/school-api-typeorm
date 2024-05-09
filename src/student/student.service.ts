import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findById(id: string) {
    const student = await this.studentRepository.find({
      where: { id },
      relations: {
        class: true,
      },
    });
    if (student.length === 0) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async searchByQuery(firstName?: string, lastName?: string) {
    const whereClause = {
      firstName: firstName ? ILike(`%${firstName}%`) : undefined,
      lastName: lastName ? ILike(`%${lastName}%`) : undefined,
    };
    const result = await this.studentRepository.find({
      where: whereClause,
      relations: {
        class: true,
      },
    });
    if (result.length === 0) {
      throw new NotFoundException('No result found');
    }
    return result;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    Object.assign(student, updateStudentDto);
    return await this.studentRepository.save(student);
  }

  async remove(id: string) {
    const Student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!Student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentRepository.save({
      id: Student.id,
      classId: null,
    });
    return await this.studentRepository.softRemove(Student);
  }
}
