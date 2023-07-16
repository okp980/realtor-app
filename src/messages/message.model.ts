import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Message {
  @Prop({ type: String, required: true })
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  realtor: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
