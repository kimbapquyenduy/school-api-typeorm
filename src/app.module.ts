import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
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
