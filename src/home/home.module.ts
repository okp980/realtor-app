import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from './home.model';
import { ImageModule } from 'src/image/image.module';
import { Image, ImageSchema } from 'src/image/image.model';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Home.name, schema: HomeSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
    MessagesModule,
    UserModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
