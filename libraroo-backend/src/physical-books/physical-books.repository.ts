import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PhysicalBook,
  PhysicalBookDocument,
} from './models/physical-book.model';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/db/base.repository';

@Injectable()
export class PhysicalBooksRepositroy extends BaseRepository<PhysicalBook> {
  constructor(
    @InjectModel(PhysicalBook.name)
    private physicalBookModel: Model<PhysicalBookDocument>,
  ) {
    super(physicalBookModel);
  }
}
