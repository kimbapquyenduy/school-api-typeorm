import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';

import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TeacherModule,
    ClassModule,
    StudentModule,
  ],
})
export class AppModule {}
