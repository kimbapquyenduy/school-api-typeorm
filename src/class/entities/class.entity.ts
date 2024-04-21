import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'classes', synchronize: true })
export class Class {
  @PrimaryGeneratedColumn('uuid', { name: 'class_id' })
  id: string;

  @Column({ name: 'class_name' })
  name: string;

  @Column({ name: 'class_school_year' })
  schoolYear: string;

  @Column({ name: 'teacher_id' })
  teacherId: String;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
