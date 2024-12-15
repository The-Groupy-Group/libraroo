import { FilterQuery } from 'mongoose';

export class QueryOptions<T> {
  maxResults: number = 10;
  startIndex: number = 0;
  sort?: { [key: string]: 1 | -1 };
  filter?: FilterQuery<T>;
}
