import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from '../src/entities/teacher';
import { TeacherService } from '../src/teacher/teacher.service';
import { ILike, Repository } from 'typeorm';

describe('TeacherService', () => {
  let service: TeacherService;
  let teacherRepository: Repository<Teacher>;
  const mockTeachers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      specialize: 'Math',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'Female',
      specialize: 'Science',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      gender: 'Female',
      specialize: 'English',
    },
  ];
  const mockTeacher = {
    teacherId: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
    firstName: 's3',
    lastName: 'Test1',
    gender: 'Male',
    dateOfBirth: '1999-12-03',
    specialize: 'Math',
  };
  const mockTeacher2 = {
    teacherId: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
    firstName: 's2',
    lastName: 'Test1',
    gender: 'Male',
    dateOfBirth: new Date(),
    specialize: 'Math',
  };
  const mockEmptyTeacher = [];
  const MockTeacherRep = {
    find: jest.fn().mockReturnValue([mockTeacher]),
    findOne: jest.fn().mockReturnValue(mockTeacher),
    save: jest.fn().mockReturnValue(mockTeacher),
    create: jest.fn().mockReturnValue(mockTeacher),
    softRemove: jest.fn().mockReturnValue(mockTeacher),
  };

  beforeEach(async () => {
    const token = getRepositoryToken(Teacher);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: token,
          useValue: MockTeacherRep,
        },
      ],
    }).compile();
    service = module.get<TeacherService>(TeacherService);
    teacherRepository = module.get<Repository<Teacher>>(token);
  });

  describe('findAll', () => {
    it('Should return all the teacher', async () => {
      const result = await teacherRepository.find({});
      expect(result).toEqual([mockTeacher]);
    });
  });
  describe('searchByQuery', () => {
    const mockWhereClause = {
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'Female',
      specialize: 'Science',
    };
    it('Should return all teacher', async () => {
      const result = await service.searchByQuery();
      expect(teacherRepository.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockTeacher]);
    });
    it('Should return teacher that fit first name', async () => {
      const result = await service.searchByQuery(mockWhereClause.firstName);
      expect(result).toEqual([mockTeacher]);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: { firstName: ILike(`%${mockWhereClause.firstName}%`) },
        relations: { class: true },
      });
    });

    it('Should return teacher that fit last name', async () => {
      const result = await service.searchByQuery('', mockWhereClause.lastName);
      expect(result).toEqual([mockTeacher]);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: {
          lastName: ILike(`%${mockWhereClause.lastName}%`),
        },
        relations: { class: true },
      });
    });

    it('Should return teacher that fit gender', async () => {
      const result = await service.searchByQuery(
        '',
        '',
        mockWhereClause.gender,
      );

      expect(result).toEqual([mockTeacher]);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: {
          gender: ILike(mockWhereClause.gender),
        },
        relations: { class: true },
      });
    });
    it('Should return teacher that fit specialize', async () => {
      const result = await service.searchByQuery(
        '',
        '',
        '',
        mockWhereClause.specialize,
      );

      expect(result).toEqual([mockTeacher]);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: {
          specialize: ILike(`%${mockWhereClause.specialize}%`),
        },
        relations: { class: true },
      });
    });

    it('Should return teacher that fit all the field', async () => {
      const result = await service.searchByQuery(
        mockWhereClause.firstName,
        mockWhereClause.lastName,
        mockWhereClause.gender,
        mockWhereClause.specialize,
      );

      expect(result).toEqual([mockTeacher]);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: {
          firstName: ILike(`%${mockWhereClause.firstName}%`),
          lastName: ILike(`%${mockWhereClause.lastName}%`),
          gender: ILike(mockWhereClause.gender),
          specialize: ILike(`%${mockWhereClause.specialize}%`),
        },
        relations: { class: true },
      });
    });
  });
  describe('findById', () => {
    it('Should return a teacher', async () => {
      const result = await service.findById(
        '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
      );
      expect(teacherRepository.find).toHaveBeenCalledWith({
        where: { id: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe' },
        relations: {
          class: true,
        },
      });
      expect(result).toEqual([mockTeacher]);
    });
  });
  it('Should return a not found error', async () => {
    try {
      jest.spyOn(teacherRepository, 'find').mockResolvedValue(mockEmptyTeacher);
    } catch (error) {
      console.log(error);
      expect(error).toEqual('Teacher not found');
    }
  });
  describe('Create', () => {
    it('Should create a teacher', async () => {
      const newTeacher = await teacherRepository.create(mockTeacher);
      const result = await teacherRepository.save(newTeacher);
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('Update', () => {
    it('Should update a teacher ', async () => {
      service.update(mockTeacher.teacherId, mockTeacher2);
      expect(teacherRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTeacher.teacherId },
      });
      Object.assign(mockTeacher, mockTeacher2);
      expect(teacherRepository.save).toHaveBeenCalledWith(mockTeacher2);
    });
  });
  describe('Remove', () => {
    it('Should soft remove a teacher along with the relation', async () => {
      const Teacher = await teacherRepository.findOne({
        where: { id: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe' },
      });
      await teacherRepository.save({
        id: Teacher.id,
        classId: null,
      });
      const result = await teacherRepository.softRemove(Teacher);
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('RemoveF', () => {
    it('Should remove f the teacher', async () => {
      const Teacher = await teacherRepository.findOne({
        where: { id: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe' },
        relations: ['class'],
      });
      const result = await teacherRepository.softRemove(Teacher);
      expect(result).toEqual(mockTeacher);
    });
  });
});
