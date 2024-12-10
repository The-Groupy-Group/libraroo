import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/db/base.repository';
import { CatalogBook } from './models/catalog-book.model';

@Injectable()
export class CatalogBooksRepository extends BaseRepository<CatalogBook> {
  constructor(
    @InjectModel(CatalogBook.name)
    private catalogBooksModel: Model<CatalogBook>,
  ) {
    super(catalogBooksModel);
  }

  async findByTitleAndAuthor(
    title: string,
    author: string,
  ): Promise<CatalogBook | null> {
    return this.catalogBooksModel.findOne({ author, title }).exec();
  }
}
