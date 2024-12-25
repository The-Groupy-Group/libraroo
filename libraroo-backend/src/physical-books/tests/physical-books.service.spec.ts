import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBooksService } from '../physical-books.service';

describe('PhysicalBooksService', () => {
  let service: PhysicalBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalBooksService],
    }).compile();

    service = module.get<PhysicalBooksService>(PhysicalBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
