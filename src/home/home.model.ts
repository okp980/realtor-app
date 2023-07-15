import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type HouseDocument = HydratedDocument<House>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class House {
  @Prop({ required: [true, 'name of house is required'], type: String })
  name: string;

  @Prop()
  address: string;
}

export const HouseSchema = SchemaFactory.createForClass(House);
