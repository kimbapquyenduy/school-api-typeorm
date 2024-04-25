import { Class } from 'src/class/entities/class.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid', { name: 'student_id' })
  id: string;

  @Column({ name: 'student_first_name' })
  firstName: string;

  @Column({ name: 'student_last_name' })
  lastName: string;

  @Column({ name: 'student_gender' })
  gender: string;

  @Column({ name: 'student_date_of_birth' })
  dateOfBirth: Date;

  @Column({ name: 'class_id', nullable: true })
  classId: String;

  @ManyToOne(() => Class, (classes) => classes.students)
  @JoinColumn({ name: 'class_id' })
  class: Class;

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
