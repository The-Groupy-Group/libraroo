import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { QueryOptions } from '../models/query-options';

export abstract class BaseRepository<T> {
  protected constructor(protected readonly model: Model<T & Document>) {}

  async create(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save() as T;
  }
  async findAll(
    options: QueryOptions<T>,
  ): Promise<T[]> {
    if (options.maxResults === 0) return [];
    return this.model
      .find(options.filter)
      .limit(options.maxResults)
      .skip(options.startIndex)
      .sort(options.sort)
      .exec();
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
  protected getCaseInsensitiveRegexPattern(value: string): FilterQuery<T> {
    return { $regex: `^${value}$`, $options: 'i' };
  }

  /**
   *
   * @param value
   * @returns insensitive filter where value is substring of value in db
   */
  protected getCaseInsensitiveSubStringRegexPattern(
    value: string,
  ): FilterQuery<T> {
    return { $regex: `${value}`, $options: 'i' };
  }
}
