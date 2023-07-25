import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.model';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    return (await this.messageModel.create(createMessageDto)).populate(
      'home buyer realtor',
    );
  }

  async find(params: any) {
    return await this.messageModel.find(params);
  }
}
