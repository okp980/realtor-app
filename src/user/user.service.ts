import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { Home } from 'src/home/home.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Home.name) private homeModel: Model<Home>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Partial<User | undefined>> {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email }).select('+password');

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findRealtorByHome(id: string) {
    const foundHome = await this.homeModel.findById(id).populate('realtor');
    console.log(foundHome);

    return foundHome.realtor;
  }

  async findOneById(id: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findById(id);

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
