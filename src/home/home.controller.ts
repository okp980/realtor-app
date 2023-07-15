import { Body, Controller, Get, Post } from '@nestjs/common';
import { House } from './home.model';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/CreateHomeDto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  getAllHouses(): Promise<Partial<House[]>> {
    return this.homeService.getAllHouses();
  }
  @Post()
  createHome(@Body() body: CreateHomeDto) {
    return this.homeService.createHome(body);
  }
}
