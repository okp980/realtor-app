import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHomeServiceDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Home } from './home.model';
import { Model } from 'mongoose';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/image.model';
import { MessagesService } from 'src/messages/messages.service';
import { InquireDto } from './dto/inquire-home.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Home.name) private homeModel: Model<Home>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
    private readonly imageService: ImageService,
    private readonly messagesService: MessagesService,
    private readonly userService: UserService,
  ) {}
  async create(createHomeDto: CreateHomeServiceDto) {
    const { images, ...home } = createHomeDto;
    const NewHome = new this.homeModel(home);
    const imagesArr = await Promise.all(
      images.map(
        async (image) =>
          await this.imageService.create({ ...image, home: NewHome.id }),
      ),
    );
    NewHome.images = imagesArr;
    return await NewHome.save();
  }

  async findAll() {
    return await this.homeModel
      .find()
      .populate({ path: 'images', select: 'url' })
      .populate({ path: 'realtor', select: 'name email phone' });
  }

  async findOne(id: string) {
    return await this.homeModel
      .findById(id)
      .populate({ path: 'images', select: 'url' })
      .populate({ path: 'realtor', select: 'name email phone' });
  }

  async update(id: string, updateHomeDto: UpdateHomeDto, user: any) {
    const home = await this.findOne(id);

    if (!home) {
      throw new NotFoundException();
    }

    // @ts-ignore
    if (home.realtor.id !== user.id) {
      throw new ForbiddenException();
    }

    return await this.homeModel
      .findByIdAndUpdate(id, updateHomeDto, {
        new: true,
        runValidators: true,
      })
      .populate({ path: 'images', select: 'url' })
      .populate({ path: 'realtor', select: 'name email phone' });
  }

  async remove(id: string, user: any) {
    const home = await this.findOne(id);

    if (!home) {
      throw new NotFoundException();
    }

    // @ts-ignore
    if (home.realtor.id !== user.id) {
      throw new ForbiddenException();
    }
    const session = await this.homeModel.startSession();

    await session.withTransaction(async () => {
      await this.imageModel.deleteMany({ home: home.id }, { session });
      await this.homeModel.findByIdAndDelete(id, {
        new: true,
        session,
      });
    });

    return {
      message: 'Deleted Successfully',
    };
  }

  async inquire(id: string, { message }: InquireDto, user: any) {
    const realtor: any = await this.userService.findRealtorByHome(id);

    return this.messagesService.create({
      buyer: user.id as string,
      home: id,
      message,
      realtor: realtor.id,
    });
  }

  async home_messages(id: string) {
    return await this.messagesService.find({ home: id });
  }
}
