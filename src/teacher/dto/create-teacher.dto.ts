import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsDateString,
  Contains,
  Matches,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { ILike } from 'typeorm';

export class CreateTeacherDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty({ message: 'First name should not be empty' })
  firstName: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty({ message: 'Last name should not be empty' })
  lastName: string;

  @IsString()
  @Matches(/\b(?:female|male)\b/i, {
    message: 'Value must be a gender value (male or female)',
  })
  @IsNotEmpty({ message: 'Gender should not be empty' })
  gender: string;

  @IsDateString()
  @IsNotEmpty({ message: 'DOB should not be empty' })
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty({ message: 'Specialize name should not be empty' })
  specialize: string;

  @IsUUID()
  classId: string;
}
