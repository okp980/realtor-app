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

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email }).select('+password');

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
