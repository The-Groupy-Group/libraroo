import { ApiProperty } from '@nestjs/swagger';
import { cover } from '../models/cover';

export class PhysicalBookDto {
  @ApiProperty({ example: '123', description: 'physical book id' })
  id: string;

  @ApiProperty({ example: '321', description: 'catalog book id' })
  bookCatalogId: string;

  @ApiProperty({ example: '111', description: 'books owner id' })
  ownerId: string;

  @ApiProperty({ example: '222', description: 'current borrower id' })
  CurrentBorrowerId: string | null;

  @ApiProperty({ example: 'Donfil', description: 'list of images' })
  images: string[];

  @ApiProperty({ example: 'paperback', description: 'cover type' })
  coverType: cover;

  @ApiProperty({
    example: 'The book is very old and lost a few pages',
    description: 'description of the book',
  })
  description: string;
}
