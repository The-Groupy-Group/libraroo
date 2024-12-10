import { CatalogBookMapper } from './catalog-book-mapper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatalogBookDto } from './dto/create-catalog-book.dto';
import { CatalogBooksRepository } from './catalog-books.repository';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { BooksApiService } from './books-api/books-api.service';

@Injectable()
export class CatalogBooksService {
  constructor(
    private readonly catalogBookRepository: CatalogBooksRepository,
    private readonly booksApiService: BooksApiService,
  ) {}

  async create(
    createCatalogBookDto: CreateCatalogBookDto,
  ): Promise<CatalogBookDto> {
    const catalogBook =
      await this.catalogBookRepository.findByTitleAuthorAndLanguage(
        //internal db check
        createCatalogBookDto.author,
        createCatalogBookDto.title,
        createCatalogBookDto.language,
      );
    if (catalogBook) return CatalogBookMapper.toCatalogBookDto(catalogBook);

    const res = await this.booksApiService.findByTitleAuthorAndLanguage(
      //external api check
      createCatalogBookDto.author,
      createCatalogBookDto.title,
      createCatalogBookDto.language,
    );
    if (res.data.totalItems == 0 || res.status !== 200)
      throw new BadRequestException('No matching book found or API error');
    const exactMatchBook = res.data.items.find((book: BookItem) => {
      const authors = book.volumeInfo.authors || [];
      const title = book.volumeInfo.title || '';

      // Ensure exact match between author and title in response
      const isAuthorMatch = authors.some(
        (author: string) =>
          author.toLowerCase() === createCatalogBookDto.author.toLowerCase(),
      );
      const isTitleMatch =
        title.toLowerCase() === createCatalogBookDto.title.toLowerCase();

      return isAuthorMatch && isTitleMatch;
    });

    // Ensure exact match is found in the API response
    if (!exactMatchBook)
      throw new BadRequestException(
        'No exact match found for the author and title',
      );

    const bookToSave = CatalogBookMapper.toCatalogBookDb(exactMatchBook);
    const savedBookCatalog =
      await this.catalogBookRepository.create(bookToSave);

    return CatalogBookMapper.toCatalogBookDto(savedBookCatalog);
  }
}
