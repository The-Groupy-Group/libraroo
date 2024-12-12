import { Test, TestingModule } from '@nestjs/testing';
import { BooksApiService } from '../books-api.service';
import { HttpModule } from '@nestjs/axios';

describe('BooksApiService', () => {
  let service: BooksApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BooksApiService],
    }).compile();

    service = module.get<BooksApiService>(BooksApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
