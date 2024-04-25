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
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'classes', synchronize: true })
export class Class {
  @PrimaryGeneratedColumn('uuid', { name: 'class_id' })
  id: string;

  @Column({ name: 'class_name' })
  name: string;

  @Column({ name: 'class_school_year' })
  schoolYear: string;

  @OneToMany(() => Student, (student) => student.class, { cascade: true })
  students: Student[];

  @OneToOne(() => Teacher, (teacher) => teacher.class)
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

  @DeleteDateColumn()
  deletedAt: Date;
}
