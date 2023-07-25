import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  home: string;

  @IsString()
  @IsNotEmpty()
  buyer: string;

  @IsString()
  @IsNotEmpty()
  realtor: string;
}
