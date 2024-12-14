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
    queryCatalogBookDto: QueryOptions<QueryCatalogBookDto>,
  ): Promise<CatalogBook[]> {
    if (queryCatalogBookDto.queries)
      queryCatalogBookDto.filter = this.createQueryFilter(
        queryCatalogBookDto.queries,
      );
    return this.findAll(queryCatalogBookDto);
  }

  private createQueryFilter(
    queries: QueryCatalogBookDto,
  ): FilterQuery<QueryCatalogBookDto> {
    const authorFilter = queries.author
      ? this.getCaseInsensitiveSubStringRegexPattern(queries.author)
      : undefined;

    const titleFilter = queries.title
      ? this.getCaseInsensitiveSubStringRegexPattern(queries.title)
      : undefined;

    const languageFilter = queries.language
      ? this.getCaseInsensitiveSubStringRegexPattern(queries.language)
      : undefined;

    const categoriesFilter =
      queries.categories && queries.categories.length > 0
        ? {
            categories: {
              $in: queries.categories.map((category) =>
                this.getCaseInsensitiveSubStringRegexPattern(category),
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
