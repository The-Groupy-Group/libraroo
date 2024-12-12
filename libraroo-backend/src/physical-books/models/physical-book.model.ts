import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PhysicalBook {
  _id: string;
}

export type PhysicalBookDocument = PhysicalBook & Document;

export const PhysicalBookSchema = SchemaFactory.createForClass(PhysicalBook);
