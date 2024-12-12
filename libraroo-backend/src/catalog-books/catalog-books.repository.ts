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
    const authorFilter = this.getCaseInsensitiveRegexPattern(author);
    const titleFilter = this.getCaseInsensitiveRegexPattern(title);
    const languageFilter = this.getCaseInsensitiveRegexPattern(language);
    const filter: FilterQuery<CatalogBook> = {
      author: authorFilter,
      title: titleFilter,
      language: languageFilter,
    };
    return this.catalogBooksModel.findOne(filter).exec();
  }
}
