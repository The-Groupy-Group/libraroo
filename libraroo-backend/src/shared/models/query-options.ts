import { FilterQuery } from 'mongoose';
import { PaginationDto } from './pagination.dto';

export class QueryOptions<T> extends PaginationDto{
  sort?: { [key: string]: 1 | -1 };
  filter?: FilterQuery<T>;
}
