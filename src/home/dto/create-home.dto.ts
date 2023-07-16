import { Image } from 'src/image/image.model';
import { PropertyType } from '../home.model';
import { Message } from 'src/messages/message.model';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  number_of_bedrooms: number;

  @IsNumber()
  @IsPositive()
  number_of_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsPositive()
  land_size: number;

  @IsEnum(PropertyType)
  property_type: PropertyType;

  @IsArray()
  images: Image[];
}

export class CreateHomeServiceDto extends CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  realtor: string;
}
