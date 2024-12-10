import { ApiProperty } from '@nestjs/swagger';

export class CatalogBookDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  categories: string[];
}
