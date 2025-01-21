import { PhysicalBook } from './../models/physical-book.model';
import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBooksService } from '../physical-books.service';
import { PhysicalBooksRepository } from '../physical-books.repository';
import { CreatePhysicalBookDto } from '../dto/create-physical-book.dto';
import { Covers } from '../models/cover';
import mongoose from 'mongoose';
import { PhysicalBookMapper } from '../physical-book.mapper';

describe('PhysicalBooksService', () => {
  let service: PhysicalBooksService;
  let physicalBooksRepository: jest.Mocked<PhysicalBooksRepository>;
  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<PhysicalBooksRepository>> = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicalBooksService,
        {
          provide: PhysicalBooksRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();
    service = module.get<PhysicalBooksService>(PhysicalBooksService);
    physicalBooksRepository = module.get<
      PhysicalBooksRepository,
      jest.Mocked<PhysicalBooksRepository>
    >(PhysicalBooksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return PhysicalBook model', async () => {
      const createPhysicalBookDto: CreatePhysicalBookDto = {
        bookCatalogId: '676c246dc1c15333a0018d53',
        images: ['image1', 'image2'],
        cover: Covers.PAPERBACK,
        description: 'description',
      };
      const physicalBook: PhysicalBook = {
        _id: new mongoose.Types.ObjectId(),
        bookCatalogId: new mongoose.Types.ObjectId(),
        images: ['image1', 'image2'],
        cover: Covers.PAPERBACK,
        description: 'description',
        ownerId: new mongoose.Types.ObjectId('676c246dc1c15333a0018d53'),
        CurrentBorrowerId: null,
      };
      const mockRequest = {
        user: {
          id: '676c246dc1c15333a0018d53', //ownerId
        },
      };
      physicalBooksRepository.create.mockResolvedValue(physicalBook);
      const res = await service.create(
        mockRequest.user.id,
        createPhysicalBookDto,
      );
      expect(res).toMatchObject(
        PhysicalBookMapper.toPhysicalBookDto(physicalBook),
      );
    });
  });
});
