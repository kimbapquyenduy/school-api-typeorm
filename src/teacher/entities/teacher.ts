import { Class } from 'src/class/entities/class.entity';
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
@Entity({ name: 'teachers', synchronize: true })
export class Teacher {
  @PrimaryGeneratedColumn('uuid', { name: 'teacher_id' })
  id: string;

  @Column({ name: 'teacher_first_name' })
  firstName: string;

  @Column({ name: 'teacher_last_name' })
  lastName: string;

  @Column({ name: 'teacher_gender' })
  gender: string;

  @Column({ name: 'teacher_date_of_birth' })
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

  @DeleteDateColumn()
  deletedAt: Date;
  // @BeforeUpdate()
  // BeforeUpdate() {
  //   this.updatedAt = new Date();
  // }
}
