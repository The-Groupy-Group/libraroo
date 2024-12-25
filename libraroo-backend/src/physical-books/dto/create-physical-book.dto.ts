import { ApiProperty } from '@nestjs/swagger';
import { cover } from '../models/cover';

export class CreatePhysicalBookDto {
  @ApiProperty()
  bookCatalogId: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  cover: cover;

  @ApiProperty()
  description: string;
}
