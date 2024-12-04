import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PhysicalBook {
  _id: string;
}

export const PhysicalBookSchema = SchemaFactory.createForClass(PhysicalBook);
