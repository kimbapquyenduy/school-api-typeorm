import { Class } from './class.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ name: 'specialize' })
  specialize: string;

  @Column({ name: 'class_id', nullable: true })
  classId: string;

  @OneToOne(() => Class, (theClass) => theClass.teacher, {
    cascade: true,
  })
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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
