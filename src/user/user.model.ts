import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

enum UserType {
  BUYER = 'buyer',
  REALTOR = 'realtor',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, enum: UserType, default: UserType.BUYER })
  userType: UserType;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Home' }])
  homes: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  buyer_messages: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  realtor_messages: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
