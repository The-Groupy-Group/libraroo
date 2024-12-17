import { CatalogBookMapper } from './catalog-book-mapper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatalogBookDto } from './dto/create-catalog-book.dto';
import { CatalogBooksRepository } from './catalog-books.repository';
import { CatalogBookDto } from './dto/catalog-book.dto';
import { BooksApiService } from './books-api/books-api.service';
import { BookItem } from './books-api/types/books-api.types';
import { QueryCatalogBookDto } from './dto/query-catalog-book.dto';

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

    const books = await this.booksApiService.findByTitleAuthorAndLanguage(
      //external api check
      createCatalogBookDto.author,
      createCatalogBookDto.title,
      createCatalogBookDto.language,
    );
    if (books.totalItems == 0)
      throw new BadRequestException('This book doesnt exist');
    const exactMatchBook = this.ensureMatch(books.items, createCatalogBookDto);

    if (!exactMatchBook)
      throw new BadRequestException('This book doesnt exist');

    const bookToSave = CatalogBookMapper.toCatalogBookDb(exactMatchBook);
    const savedBookCatalog =
      await this.catalogBookRepository.create(bookToSave);

    return CatalogBookMapper.toCatalogBookDto(savedBookCatalog);
  }

  /**
   *
   * @param books
   * @param createCatalogBookDto
   * @returns One book after removing similar titles/authors to exact full names
   */
  private ensureMatch(
    books: BookItem[],
    createCatalogBookDto: CreateCatalogBookDto,
  ): BookItem {
    return books.find((book: BookItem) => {
      const authors = book.volumeInfo.authors || [];
      const title = book.volumeInfo.title || '';
      const isAuthorMatch = authors.some(
        (author: string) =>
          author.toLowerCase() === createCatalogBookDto.author.toLowerCase(),
      );
      const isTitleMatch =
        title.toLowerCase() === createCatalogBookDto.title.toLowerCase();

      return isAuthorMatch && isTitleMatch &&book.volumeInfo!=undefined&&book.volumeInfo.imageLinks!=undefined&&book.volumeInfo.imageLinks.thumbnail!=undefined;
    });
  }

  async getBooksByQueries(
    queryCatalogBookDto: QueryCatalogBookDto,
  ): Promise<CatalogBookDto[]> {
    const catalogBooks =
      await this.catalogBookRepository.getBooksByQueries(queryCatalogBookDto);
    const catalogBookDtoArray = catalogBooks.map((catalogBook) =>
      CatalogBookMapper.toCatalogBookDto(catalogBook),
    );
    return catalogBookDtoArray;
  }
}
