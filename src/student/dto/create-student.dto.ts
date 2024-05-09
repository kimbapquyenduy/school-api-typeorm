import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty({ message: 'First name must not be empty' })
  firstName: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty({ message: 'Last name must not be empty' })
  lastName: string;

  @IsString()
  @Matches(/\b(?:female|male)\b/i, {
    message: 'Value must be a gender value (male or female)',
  })
  @IsNotEmpty({ message: 'Gender must not be empty' })
  gender: string;

  @IsDateString()
  @IsNotEmpty({ message: 'DOB must not be empty' })
  dateOfBirth: Date;
}
