import { BookItem } from './books-api/types/books-api.types';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { CatalogBook } from './models/catalog-book.model';

export class CatalogBookMapper {
  static toCatalogBookDto(catalogBook: CatalogBook): CatalogBookDto {
    return {
      id: catalogBook._id.toString(),
      authors: catalogBook.authors,
      title: catalogBook.title,
      language: catalogBook.language,
      imageUrl: catalogBook.imageUrl,
      categories: catalogBook.categories,
    };
  }

  static toCatalogBookDb(book: BookItem): Partial<CatalogBook> {
    return {
      authors: book.volumeInfo.authors,
      title: book.volumeInfo.subtitle
        ? `${book.volumeInfo.title} ${book.volumeInfo.subtitle}`
        : book.volumeInfo.title,
      imageUrl: book.volumeInfo.imageLinks.thumbnail,
      categories: book.volumeInfo.categories,
      language: book.volumeInfo.language,
    };
  }
}
