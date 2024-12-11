import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/db/base.repository';
import { CatalogBook } from './models/catalog-book.model';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CatalogBooksRepository extends BaseRepository<CatalogBook> {
  constructor(
    @InjectModel(CatalogBook.name)
    private catalogBooksModel: Model<CatalogBook>,
  ) {
    super(catalogBooksModel);
  }

  async findByTitleAuthorAndLanguage(
    author: string,
    title: string,
    language: string,
  ): Promise<CatalogBook | null> {
    const authorPattern = `^${author.split(/\s+/).join('.*')}$`;
    const titlePattern = `^${title.split(/\s+/).join('.*')}$`;
    const filter: FilterQuery<CatalogBook> = {
      author: new RegExp(authorPattern, 'i'),
      title: new RegExp(titlePattern, 'i'),
      language: new RegExp(language, 'i'),
    };
    return this.catalogBooksModel.findOne(filter).exec();
  }
}
