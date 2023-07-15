import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { House } from './home.model';
import { Model } from 'mongoose';
import { CreateHomeDto } from './dto/CreateHomeDto';

@Injectable()
export class HomeService {
  constructor(@InjectModel(House.name) private houseModel: Model<House>) {}
  async getAllHouses() {
    try {
      return await this.houseModel.find();
    } catch (error) {
      throw new HttpException(
        'Error Occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createHome(body: CreateHomeDto) {
    return await this.houseModel.create(body);
  }
}
