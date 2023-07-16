import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Image } from 'src/image/image.model';
import { Message } from 'src/messages/message.model';

enum PropertyType {
  RESIDENTIAL = 'residential',
  CONDO = 'condo',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Home {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Number, required: true })
  number_of_bedrooms: number;

  @Prop({ type: Number, required: true })
  number_of_bathrooms: number;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  land_size: number;

  @Prop({ type: String, enum: PropertyType, required: true })
  property_type: PropertyType;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  ])
  images: Image[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  realtor: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  messages: Message[];
}

export const HomeSchema = SchemaFactory.createForClass(Home);
