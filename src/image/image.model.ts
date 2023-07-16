import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Image {
  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true })
  home: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
