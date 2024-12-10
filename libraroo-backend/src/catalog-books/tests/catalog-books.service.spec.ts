import { Test, TestingModule } from '@nestjs/testing';
import { CatalogBooksService } from '../catalog-books.service';

describe('CatalogBooksService', () => {
  let service: CatalogBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogBooksService],
    }).compile();

    service = module.get<CatalogBooksService>(CatalogBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
