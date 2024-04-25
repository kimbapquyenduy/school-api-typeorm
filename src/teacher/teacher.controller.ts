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
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Query } from '@nestjs/common/decorators';
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  searchByQuery(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('gender') gender?: string,
    @Query('specialize') specialize?: string,
  ) {
    return this.teacherService.searchByQuery(
      firstName,
      lastName,
      gender,
      specialize,
    );
  }
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.remove(id);
  }
  @Delete(':id/f')
  removeF(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.removeF(id);
  }
}
