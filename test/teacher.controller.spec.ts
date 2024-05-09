import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { TeacherController } from '../src/teacher/teacher.controller';
import { TeacherService } from '../src/teacher/teacher.service';

describe('TeacherController', () => {
  let controller: TeacherController;

  const mockTeacher = {
    id: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
    firstName: 'John',
    lastName: 'Snow',
    gender: 'Female',
    dateOfBirth: new Date('2022-03-25'),
    specialize: 'Math',
    classId: null,
  };

  const mockError = {
    message: 'Validation failed (uuid is expected)',
    error: 'Bad Request',
    statusCode: 400,
  };

  const MockTeacherService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findAll: jest.fn().mockImplementation(() => {
      return [mockTeacher];
    }),
    searchByQuery: jest.fn().mockImplementation(() => {
      return [mockTeacher];
    }),
    findById: jest.fn().mockImplementation(() => {
      return mockTeacher;
    }),
    update: jest.fn().mockImplementation(() => {
      return mockTeacher;
    }),
    remove: jest.fn().mockImplementation(() => {
      return mockTeacher;
    }),
    removeF: jest.fn().mockImplementation(() => {
      return mockTeacher;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        TeacherController,
        {
          provide: TeacherService,
          useValue: MockTeacherService,
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a teacher', async () => {
      expect(controller.create(mockTeacher)).toEqual({
        id: '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
        firstName: 'John',
        lastName: 'Snow',
        gender: 'Female',
        dateOfBirth: new Date('2022-03-25'),
        specialize: 'Math',
        classId: null,
      });
    });
  });
  describe('findAll', () => {
    it('should return all teacher', async () => {
      const result = await controller.findAll();
      console.log(result);
      expect(result).toEqual([mockTeacher]);
    });
  });

  describe('findById', () => {
    it('should return a teacher', async () => {
      const result = await controller.findById(
        '6c5e9edb-2e87-4aa4-8e8a-0cc7d9f832fe',
      );
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('searchByQuery', () => {
    it('should return all teacher ', async () => {
      const result = await controller.searchByQuery();
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have first name fit the query ', async () => {
      const result = await controller.searchByQuery('John', '', '', '');
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have last name fit the query ', async () => {
      const result = await controller.searchByQuery('', 'Snow', '', '');
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have gender fit the query ', async () => {
      const result = await controller.searchByQuery('', '', 'Female', '');
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have specialize fit the query ', async () => {
      const result = await controller.searchByQuery('', '', '', 'Math');
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have first name and last name fit the query ', async () => {
      const result = await controller.searchByQuery('John', 'Snow', '', '');
      expect(result).toEqual([mockTeacher]);
    });

    it('should return all teacher that have first name and gender fit the query ', async () => {
      const result = await controller.searchByQuery('John', '', 'Female', '');
      expect(result).toEqual([mockTeacher]);
    });

    it('should return all teacher that have first name and specialize fit the query ', async () => {
      const result = await controller.searchByQuery('John', '', '', 'Math');
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have first name, last name and gender fit the query ', async () => {
      const result = await controller.searchByQuery(
        'John',
        'Snow',
        'Female',
        '',
      );
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have first name, last name, gender and specialize fit the query ', async () => {
      const result = await controller.searchByQuery(
        'John',
        'Snow',
        'Female',
        'Math',
      );
      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have last name, gender and specialize fit the query ', async () => {
      const result = await controller.searchByQuery(
        '',
        'Snow',
        'Female',
        'Math',
      );

      expect(result).toEqual([mockTeacher]);
    });
    it('should return all teacher that have gender and specialize fit the query ', async () => {
      const result = await controller.searchByQuery('', '', 'Female', 'Math');
      expect(result).toEqual([mockTeacher]);
    });

    it('should return all teacher that have first name and specialize fit the query ', async () => {
      const result = await controller.searchByQuery('John', '', '', 'Math');
      expect(result).toEqual([mockTeacher]);
    });
  });

  describe('update', () => {
    it('should update teacher', async () => {
      const result = await controller.update('123', mockTeacher);
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('remove', () => {
    it('should remove teacher', async () => {
      const result = await controller.remove('123');
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('forceRemove', () => {
    it('should force remove teacher', async () => {
      const result = await controller.removeF('123');
      expect(result).toEqual(mockTeacher);
    });
  });
});
