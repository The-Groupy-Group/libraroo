import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CatalogBook {
  _id: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  categories: string[];
}

export type CatalogBookDocument = CatalogBook & Document;

export const CatalogBookSchema = SchemaFactory.createForClass(CatalogBook);
