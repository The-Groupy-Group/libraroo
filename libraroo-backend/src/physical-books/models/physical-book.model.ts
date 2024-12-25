import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { cover } from './cover';

@Schema()
export class PhysicalBook {
  _id: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'CatalogBook', required: true }],
    required: true,
  })
  bookCatalogId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User', required: true }],
    required: true,
  })
  ownerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  CurrentBorrowerId: Types.ObjectId;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  cover: cover;

  @Prop({ required: true })
  description: string;
}

export type PhysicalBookDocument = PhysicalBook & Document;

export const PhysicalBookSchema = SchemaFactory.createForClass(PhysicalBook);

export { cover };
