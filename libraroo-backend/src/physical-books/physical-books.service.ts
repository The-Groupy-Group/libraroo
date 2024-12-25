import { Injectable, Logger } from '@nestjs/common';
import { PhysicalBooksRepository } from './physical-books.repository';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { PhysicalBookDto } from './dto/physical-book.dto';
import mongoose from 'mongoose';
import { PhysicalBookMapper } from './physical-book.mapper';

@Injectable()
export class PhysicalBooksService {
  private logger: Logger = new Logger(PhysicalBooksService.name);
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository,
  ) {}

  async create(
    ownerId: string,
    createPhysicalBookDto: CreatePhysicalBookDto,
  ): Promise<PhysicalBookDto> {
    const bookCatalogId = new mongoose.Types.ObjectId(
      createPhysicalBookDto.bookCatalogId,
    );
    const ownerObjectId = new mongoose.Types.ObjectId(ownerId);
    const book = await this.physicalBooksRepository.create({
      ...createPhysicalBookDto,
      bookCatalogId,
      ownerId: ownerObjectId,
      CurrentBorrowerId: null,
    });
    this.logger.log(`created physical book: ${book}`);
    return PhysicalBookMapper.toPhysicalBookDto(book);
  }
}
