import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image.model';
import { Model } from 'mongoose';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}
  async create(createImageDto: CreateImageDto) {
    return await this.imageModel.create(createImageDto);
  }
}
