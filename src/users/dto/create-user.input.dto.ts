import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsDateString()
  birthdate: string;
}
