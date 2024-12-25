import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class PhysicalBook {
  _id: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'CatalogBook', required: true }],
    required: true,
  })
  catalogId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User', required: true }],
    required: true,
  })
  ownerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  CurrentBorrowerId: Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  coverType: string;

  @Prop({ required: true })
  description: string;
}

export type PhysicalBookDocument = PhysicalBook & Document;

export const PhysicalBookSchema = SchemaFactory.createForClass(PhysicalBook);
