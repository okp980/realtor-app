import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from 'src/user/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Roles(UserType.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createHomeDto: CreateHomeDto, @Request() req: any) {
    console.log(req.user);

    return this.homeService.create(createHomeDto);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(+id, updateHomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(+id);
  }
}
