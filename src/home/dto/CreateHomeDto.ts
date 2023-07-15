import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
