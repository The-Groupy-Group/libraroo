import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { QueryOptions } from '../models/query-options';

export abstract class BaseRepository<T> {
  protected constructor(protected readonly model: Model<T & Document>) {}

  async create(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save() as T;
  }
  async findByQuery(
    filters: FilterQuery<T> = {},
    options: QueryOptions = {},
  ): Promise<T[]> {
    const { maxResults = 10, startIndex = 0, sort = {} } = options;
    if (maxResults === 0) return [];
    return this.model
      .find(filters)
      .limit(maxResults)
      .skip(startIndex)
      .sort(sort)
      .exec();
  }
  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    const updateQuery = updateData as UpdateQuery<T & Document>;
    return this.model.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  /**
   *
   * @param value
   * @returns insensitive filter where value===value in db
   */
  protected getExactCaseInsensitiveRegexPattern(value: string): FilterQuery<T> {
    return { $regex: `^${value}$`, $options: 'i' };
  }

  /**
   *
   * @param value
   * @returns insensitive filter where value is substring of value in db
   */
  protected getCaseInsensitiveRegexPattern(value: string): FilterQuery<T> {
    return { $regex: `${value}`, $options: 'i' };
  }
}
