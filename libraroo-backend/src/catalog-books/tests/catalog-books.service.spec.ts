import { CatalogBook } from './../models/catalog-book.model';
import { BooksApiService } from './../books-api/books-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogBooksService } from '../catalog-books.service';
import { CatalogBooksRepository } from '../catalog-books.repository';
import { CreateCatalogBookDto } from '../dto/create-catalog-book.dto';
import { CatalogBookMapper } from '../catalog-book-mapper';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BooksApiResponse } from '../books-api/types/books-api.types';
import { QueryCatalogBookDto } from '../dto/query-catalog-book.dto';
import { CatalogBookDto } from '../dto/catalog-book.dto';
import mongoose from 'mongoose';

describe('CatalogBooksService', () => {
  let service: CatalogBooksService;
  let booksApiService: jest.Mocked<BooksApiService>;
  let catalogBooksRepository: jest.Mocked<CatalogBooksRepository>;
  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<CatalogBooksRepository>> = {
      findByTitleAuthorAndLanguage: jest.fn(),
      create: jest.fn(),
      getBooksByQueries: jest.fn(),
    };

    const booksApiServiceMock: Partial<jest.Mocked<BooksApiService>> = {
      findByTitleAuthorAndLanguage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogBooksService,
        {
          provide: CatalogBooksRepository,
          useValue: repositoryMock,
        },
        {
          provide: BooksApiService,
          useValue: booksApiServiceMock,
        },
      ],
    }).compile();
    service = module.get<CatalogBooksService>(CatalogBooksService);
    booksApiService = module.get<BooksApiService, jest.Mocked<BooksApiService>>(
      BooksApiService,
    );
    catalogBooksRepository = module.get<
      CatalogBooksRepository,
      jest.Mocked<CatalogBooksRepository>
    >(CatalogBooksRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return CatalogBook model if catalog book already exists', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const existingBook: CatalogBook = {
        _id: new mongoose.Types.ObjectId(),
        authors: ['Karen Armstrong'],
        title: 'Jerusalem',
        language: 'en',
        imageUrl: 'donfil.img',
        categories: ['maor', 'maor2'],
      };

      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        existingBook,
      );
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledTimes(0);
      expect(
        booksApiService.findByTitleAuthorAndLanguage,
      ).toHaveBeenCalledTimes(0);
      expect(res).toMatchObject(
        CatalogBookMapper.toCatalogBookDto(existingBook),
      );
    });
  });
  describe('create', () => {
    it('should return CatalogBook model if catalog book already exists', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const existingBook: CatalogBook = {
        _id: new mongoose.Types.ObjectId(),
        authors: ['Karen Armstrong'],
        title: 'Jerusalem',
        language: 'en',
        imageUrl: 'donfil.img',
        categories: ['maor', 'maor2'],
      };

      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        existingBook,
      );
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledTimes(0);
      expect(
        booksApiService.findByTitleAuthorAndLanguage,
      ).toHaveBeenCalledTimes(0);
      expect(res).toMatchObject(
        CatalogBookMapper.toCatalogBookDto(existingBook),
      );
    });

    it('should create and return CatalogBook model if catalog book doesnt exist', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const savedBook: CatalogBook = {
        _id: new mongoose.Types.ObjectId(),
        authors: ['Karen Armstrong'],
        title: 'Jerusalem',
        language: 'en',
        imageUrl:
          'http://books.google.com/books/content?id=TZltAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        categories: ['History'],
      };
      const books: BooksApiResponse = {
        totalItems: 1,
        items: [
          {
            volumeInfo: {
              title: 'Jerusalem',
              authors: ['Karen Armstrong'],
              language: 'en',
              categories: ['History'],
              imageLinks: {
                thumbnail:
                  'http://books.google.com/books/content?id=TZltAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
              },
            },
          },
        ],
      };
      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );
      catalogBooksRepository.create.mockResolvedValue(savedBook);
      booksApiService.findByTitleAuthorAndLanguage.mockResolvedValue(books);
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledWith({
        authors: books.items[0].volumeInfo.authors,
        title: books.items[0].volumeInfo.title,
        language: books.items[0].volumeInfo.language,
        imageUrl: books.items[0].volumeInfo.imageLinks.thumbnail,
        categories: books.items[0].volumeInfo.categories,
      });
      expect(res).toEqual(CatalogBookMapper.toCatalogBookDto(savedBook));
    });

    it('should not create book not found on local db and api threw error', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };

      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );
      booksApiService.findByTitleAuthorAndLanguage.mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.create(createCatalogBookDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should not create book not found on local db and api', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const books: BooksApiResponse = {
        totalItems: 0,
        items: [],
      };
      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );

      booksApiService.findByTitleAuthorAndLanguage.mockResolvedValue(books);
      await expect(service.create(createCatalogBookDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getBooksByQueries', () => {
    it('should return CatalogBookDto array filtered by queries and options', async () => {
      const queryCatalogBookDto: QueryCatalogBookDto = {
        authors: ['Karen Armstrong'],
        title: 'Jerusalem',
        language: 'en',
        maxResults: 10,
        startIndex: 0,
      };
      const mockBooks: CatalogBook[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          authors: ['Karen Armstrong'],
          title: 'Jerusalem',
          language: 'en',
          imageUrl: 'donfil.jpeg',
          categories: ['History'],
        },
      ];

      catalogBooksRepository.getBooksByQueries.mockResolvedValue(mockBooks);
      const mockBooksDto: CatalogBookDto[] = mockBooks.map((book) =>
        CatalogBookMapper.toCatalogBookDto(book),
      );
      const res = await service.getBooksByQueries(queryCatalogBookDto);
      expect(res).toEqual(mockBooksDto);
    });
  });
});
