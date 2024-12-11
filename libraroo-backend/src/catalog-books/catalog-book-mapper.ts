import { BookItem } from './books-api/types/books-api.types';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { CatalogBook } from './models/catalog-book.model';

export class CatalogBookMapper {
  static toCatalogBookDto(catalogBook: CatalogBook): CatalogBookDto {
    return {
      id: catalogBook._id,
      author: catalogBook.author,
      title: catalogBook.title,
      language: catalogBook.language,
      imageUrl: catalogBook.imageUrl,
      categories: catalogBook.categories,
    };
  }

  static toCatalogBookDb(book: BookItem): Partial<CatalogBook> {
    return {
      author: book.volumeInfo.authors[0],
      title: book.volumeInfo.title,
      imageUrl: book.volumeInfo.imageLinks.thumbnail,
      categories: book.volumeInfo.categories,
      language: book.volumeInfo.language,
    };
  }
}
