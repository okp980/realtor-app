import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  home: string;
}
