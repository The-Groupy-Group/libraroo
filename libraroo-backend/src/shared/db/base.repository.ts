
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
  protected constructor(protected readonly model: Model<T & Document>) {}

  async create(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save() as T;
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

  protected getCaseInsensitiveRegexPattern(value: string):FilterQuery<T> {  
    return { $regex: `^${value}$`, $options: 'i' };  
  }  
}