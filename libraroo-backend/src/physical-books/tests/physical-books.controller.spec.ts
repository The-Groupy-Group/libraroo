import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBooksController } from '../physical-books.controller';

describe('PhysicalBooksController', () => {
  let controller: PhysicalBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalBooksController],
    }).compile();

    controller = module.get<PhysicalBooksController>(PhysicalBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
