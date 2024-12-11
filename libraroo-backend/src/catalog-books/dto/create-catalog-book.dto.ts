import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Donfil', description: 'author name' })
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Donfil And The Deathly Hollows Part 1',
    description: 'title name',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'es',
    description: 'language code',
  })
  language: string;
}
