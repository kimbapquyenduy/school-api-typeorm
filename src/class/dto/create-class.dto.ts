import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty({ message: 'SchoolYear must not be empty' })
  schoolYear: string;
}
