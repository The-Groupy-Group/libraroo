import { CatalogBook } from './../models/catalog-book.model';
import { BooksApiService } from './../books-api/books-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogBooksService } from '../catalog-books.service';
import { CatalogBooksRepository } from '../catalog-books.repository';
import { CreateCatalogBookDto } from '../dto/create-catalog-book.dto';
import { AxiosResponse } from 'axios';
import { CatalogBookMapper } from '../catalog-book-mapper';
import { BadRequestException } from '@nestjs/common';

describe('CatalogBooksService', () => {
  let service: CatalogBooksService;
  let booksApiService: jest.Mocked<BooksApiService>;
  let catalogBooksRepository: jest.Mocked<CatalogBooksRepository>;
  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<CatalogBooksRepository>> = {
      findByTitleAuthorAndLanguage: jest.fn(),
      create: jest.fn(),
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
        _id: '123',
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
        image: 'donfil.img',
        categories: ['maor', 'maor2'],
      } as CatalogBook;

      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        existingBook,
      );
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledTimes(0);
      expect(
        booksApiService.findByTitleAuthorAndLanguage,
      ).toHaveBeenCalledTimes(0);
      expect(res).toMatchObject(createCatalogBookDto);
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
        _id: '123',
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
        image: 'donfil.img',
        categories: ['maor', 'maor2'],
      } as CatalogBook;

      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        existingBook,
      );
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledTimes(0);
      expect(
        booksApiService.findByTitleAuthorAndLanguage,
      ).toHaveBeenCalledTimes(0);
      expect(res).toMatchObject(createCatalogBookDto);
    });

    it('should create return CatalogBook model if catalog book doesnt exist', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const savedBook: CatalogBook = {
        _id: '123',
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
        image:
          'http://books.google.com/books/content?id=TZltAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        categories: ['History'],
      } as CatalogBook;
      const apiResponse: AxiosResponse = {
        data: {
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
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: undefined,
      };
      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );
      catalogBooksRepository.create.mockResolvedValue(savedBook);
      booksApiService.findByTitleAuthorAndLanguage.mockResolvedValue(
        apiResponse,
      );
      const res = await service.create(createCatalogBookDto);

      expect(catalogBooksRepository.create).toHaveBeenCalledWith({
        author: apiResponse.data.items[0].volumeInfo.authors[0],
        title: apiResponse.data.items[0].volumeInfo.title,
        language: apiResponse.data.items[0].volumeInfo.language,
        image: apiResponse.data.items[0].volumeInfo.imageLinks.thumbnail,
        categories: apiResponse.data.items[0].volumeInfo.categories,
      });
      expect(res).toEqual(CatalogBookMapper.toCatalogBookDto(savedBook));
    });

    it('should not create book not found on local db and api threw error', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const apiResponse: AxiosResponse = {
        data: {
          items: [{}],
        },
        status: 400,
        statusText: '',
        headers: undefined,
        config: undefined,
      };
      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );
      booksApiService.findByTitleAuthorAndLanguage.mockResolvedValue(
        apiResponse,
      );
      await expect(service.create(createCatalogBookDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should not create book not found on local db and api', async () => {
      const createCatalogBookDto: CreateCatalogBookDto = {
        author: 'Karen Armstrong',
        title: 'Jerusalem',
        language: 'en',
      };
      const apiResponse: AxiosResponse = {
        data: {
          totalItems:0,
          items: [{}],
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: undefined,
      };
      catalogBooksRepository.findByTitleAuthorAndLanguage.mockResolvedValue(
        null,
      );

      booksApiService.findByTitleAuthorAndLanguage.mockResolvedValue(
        apiResponse,
      );
      await expect(service.create(createCatalogBookDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
