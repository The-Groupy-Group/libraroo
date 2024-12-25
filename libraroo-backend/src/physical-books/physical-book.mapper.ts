import { PhysicalBookDto } from './dto/physical-book.dto';
import { PhysicalBook } from './models/physical-book.model';

export class PhysicalBookMapper {
  static toPhysicalBookDto(physicalBook: PhysicalBook): PhysicalBookDto {
    return {
      id: physicalBook._id.toString(),
      bookCatalogId: physicalBook.bookCatalogId.toString(),
      ownerId: physicalBook.ownerId.toString(),
      CurrentBorrowerId: physicalBook.CurrentBorrowerId?.toString(),
      images: physicalBook.images,
      coverType: physicalBook.cover,
      description: physicalBook.description,
    };
  }
}
