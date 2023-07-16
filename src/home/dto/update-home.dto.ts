import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeDto } from './create-home.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PropertyType } from '../home.model';
import { Image } from 'src/image/image.model';

export class UpdateHomeDto extends PartialType(CreateHomeDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  number_of_bedrooms: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  number_of_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  land_size: number;

  @IsEnum(PropertyType)
  @IsOptional()
  property_type: PropertyType;
}
