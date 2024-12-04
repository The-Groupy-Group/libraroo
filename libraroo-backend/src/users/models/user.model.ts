import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  reliabilityRating?: number; //new users won't have rating yet(null?)

  @Prop({ required: true })
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PhysicalBook' }] })
  ownedBooksList?: Types.ObjectId[]; //new users wont have books(null?)
}

export const UserSchema = SchemaFactory.createForClass(User);
