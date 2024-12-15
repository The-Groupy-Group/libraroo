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
    const authorFilter = this.getCaseInsensitiveRegexPattern(author);
    const titleFilter = this.getCaseInsensitiveRegexPattern(title);
    const languageFilter =
      this.getCaseInsensitiveSubStringRegexPattern(language);
    const filter: FilterQuery<CatalogBookDocument> = {
      author: authorFilter,
      title: titleFilter,
      language: languageFilter,
    };
    return this.catalogBooksModel.findOne(filter).exec();
  }

  async getBooksByQueries(
    queryCatalogBookDto: QueryCatalogBookDto,
  ): Promise<CatalogBook[]> {
    const filter = this.createQueryFilter(queryCatalogBookDto);
    const queryOptions: QueryOptions<CatalogBook> = {
      maxResults: queryCatalogBookDto.maxResults,
      startIndex: queryCatalogBookDto.startIndex,
      filter: filter,
    };
    return this.findAll(queryOptions);
  }

  
  private createQueryFilter(
    queries: QueryCatalogBookDto,
  ): FilterQuery<CatalogBook> {
    const authorFilter = queries.author
      ? this.getCaseInsensitiveSubStringRegexPattern(queries.author)
      : undefined;

    const titleFilter = queries.title
      ? this.getCaseInsensitiveSubStringRegexPattern(queries.title)
      : undefined;

    const languageFilter = queries.language
      ? this.getCaseInsensitiveRegexPattern(queries.language)
      : undefined;

    const categoriesFilter =
      queries.categories && queries.categories.length > 0
        ? {
            categories: {
              $in: queries.categories.map((category) =>
                this.getCaseInsensitiveRegexPattern(category),
              ),
            },
          }
        : undefined;

    const filter: FilterQuery<CatalogBook> = {};
    if (authorFilter !== undefined) filter.author = authorFilter;
    if (titleFilter !== undefined) filter.title = titleFilter;
    if (languageFilter !== undefined) filter.language = languageFilter;
    if (categoriesFilter !== undefined)
      filter.categories = { $all: categoriesFilter };
    return filter;
  }
}
