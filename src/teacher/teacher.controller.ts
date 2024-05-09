import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Query } from '@nestjs/common/decorators';
import {
  CreateTeacherDto,
  FindAllTeacherDto,
  FindTeacherByIdDto,
  RemoveTeacherDto,
  SearchByQueryDto,
  Teacher,
  Teachers,
  TeacherServiceController,
  TeacherServiceControllerMethods,
  UpdateTeacherDto,
} from 'src/proto/teacher';
import { Observable } from 'rxjs';

@Controller('teacher')
@TeacherServiceControllerMethods()
export class TeacherController implements TeacherServiceController {
  constructor(private readonly teacherService: TeacherService) {}
  update(updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    return this.teacherService.update(updateTeacherDto.id, updateTeacherDto);
  }
  async remove(removeTeacherDto: RemoveTeacherDto): Promise<Teacher> {
    return await this.teacherService.remove(removeTeacherDto.id);
  }
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherService.create(createTeacherDto);
  }
  async searchByQuery(searchByQueryDto: SearchByQueryDto): Promise<Teachers> {
    const Teacher = await this.teacherService.searchByQuery(searchByQueryDto);

    return Teacher;
  }
  async findAll(request: FindAllTeacherDto): Promise<Teachers> {
    const Teacher = await this.teacherService.findAll();

    return Teacher;
  }

  async findById(findTeacherByIdDto: FindTeacherByIdDto): Promise<Teacher> {
    const Teacher = await this.teacherService.findById(findTeacherByIdDto.id);
    return {
      ...Teacher[0],
    };
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateTeacherDto: UpdateTeacherDto,
  // ) {
  //   return this.teacherService.update(id, updateTeacherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.teacherService.remove(id);
  // }
  // @Delete(':id/f')
  // removeF(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.teacherService.removeF(id);
  // }
}
