import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Donfil', description: 'first name' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Donfil', description: 'last name' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'Donfil@gmail.com', description: 'user email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456*', description: 'hashed password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Hadonfil 13', description: 'user address' })
  address: string;
}
