import { CatalogBookDto } from './dto/catalog-book.dto';
import { CatalogBook } from './models/catalog-book.model';

export class CatalogBookMapper {
  static toCatalogBookDto(catalogBook: CatalogBook): CatalogBookDto {
    return {
      id: catalogBook._id,
      author: catalogBook.author,
      title: catalogBook.title,
      language: catalogBook.language,
      image: catalogBook.image,
      categories: catalogBook.categories,
    };
  }
}
