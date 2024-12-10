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
    const catalogBook = await this.catalogBookRepository.findByTitleAndAuthor(
      //internal db check
      createCatalogBookDto.author,
      createCatalogBookDto.title,
    );
    if (catalogBook) return CatalogBookMapper.toCatalogBookDto(catalogBook);

    const res = await this.booksApiService.findByTitleAndAuthor(
      //external api check
      createCatalogBookDto.author,
      createCatalogBookDto.title,
    );
    if (!res) throw new BadRequestException();//TODO make sure no matching book and not api error

    const newBookCatalog={
      author=
      title=
      language=
      image=
      categories=
    }
    const savedBookCatalog=await this.catalogBookRepository.create()
    return CatalogBookMapper.toCatalogBookDto(savedBookCatalog);
  }
}
