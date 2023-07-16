import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from './home.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
