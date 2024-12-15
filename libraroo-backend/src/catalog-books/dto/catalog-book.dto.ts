import { ApiProperty } from '@nestjs/swagger';

export class CatalogBookDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  authors: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  categories: string[];
}
