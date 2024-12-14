import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/db/base.repository';
import { CatalogBook, CatalogBookDocument } from './models/catalog-book.model';
import { FilterQuery } from 'mongoose';
import { QueryCatalogBookDto } from './dto/query-catalog-book.dto';
import { QueryOptions } from 'src/shared/models/query-options';

@Injectable()
export class CatalogBooksRepository extends BaseRepository<CatalogBook> {
  constructor(
    @InjectModel(CatalogBook.name)
    private catalogBooksModel: Model<CatalogBookDocument>,
  ) {
    super(catalogBooksModel);
  }

  async findByTitleAuthorAndLanguage(
    author: string,
    title: string,
    language: string,
  ): Promise<CatalogBook | null> {
    const authorFilter = this.getExactCaseInsensitiveRegexPattern(author);
    const titleFilter = this.getExactCaseInsensitiveRegexPattern(title);
    const languageFilter = this.getExactCaseInsensitiveRegexPattern(language);
    const filter: FilterQuery<CatalogBookDocument> = {
      author: authorFilter,
      title: titleFilter,
      language: languageFilter,
    };
    return this.catalogBooksModel.findOne(filter).exec();
  }

  async getBooksByQueries(
    queryCatalogBookDto: QueryCatalogBookDto,
    options: QueryOptions,
  ): Promise<CatalogBook[] | null> {
    const filter = this.createQueryFilter(queryCatalogBookDto);
    console.log(filter);
    return this.findByQuery(filter, options);
  }

  private createQueryFilter(
    queryCatalogBookDto: QueryCatalogBookDto,
  ): FilterQuery<QueryCatalogBookDto> {
    const authorFilter = queryCatalogBookDto.author
      ? this.getCaseInsensitiveRegexPattern(queryCatalogBookDto.author) // Notice the difference between getCaseInsensitiveRegexPattern and getExactCaseInsensitiveRegexPattern
      : undefined;

    const titleFilter = queryCatalogBookDto.title
      ? this.getCaseInsensitiveRegexPattern(queryCatalogBookDto.title)
      : undefined;

    const languageFilter = queryCatalogBookDto.language
      ? this.getExactCaseInsensitiveRegexPattern(queryCatalogBookDto.language)
      : undefined;

    const categoriesFilter =
      queryCatalogBookDto.categories &&
      queryCatalogBookDto.categories.length > 0
        ? {
            categories: {
              $in: queryCatalogBookDto.categories.map((category) =>
                this.getExactCaseInsensitiveRegexPattern(category),
              ),
            },
          }
        : undefined;

    const filter: FilterQuery<QueryCatalogBookDto> = {};
    if (authorFilter !== undefined) filter.author = authorFilter;
    if (titleFilter !== undefined) filter.title = titleFilter;
    if (languageFilter !== undefined) filter.language = languageFilter;
    if (categoriesFilter !== undefined)
      filter.categories = { $all: categoriesFilter };
    return filter;
  }
}
