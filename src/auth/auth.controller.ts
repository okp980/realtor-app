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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: '',
          description: 'Full name of user',
        },
        email: {
          type: 'string',
          example: '',
          description: 'Enter email address',
        },
        phone: {
          type: 'string',
          example: '+2348123456756',
          description: 'Phone Number',
        },
        password: {
          type: 'string',
          example: '',
          description: 'Enter Strong password',
        },
      },
      required: ['name', 'email', 'phone', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Register new User Successful',
    schema: {
      type: 'object',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhMDVkNDE5YmE3NmQwN2Q0N2RjMCIsImlhdCI6MTY5MDI4MDAzMCwiZXhwIjoxNjkwMzY2NDMwfQ.rlIzyBj5IUynbcbb-gXZzllsLU9cPW2ujH2BTka1YrQ',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async register(@Body() body: CreateAuthDto) {
    return await this.authService.register(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: '',
          description: 'Enter email address',
        },

        password: {
          type: 'string',
          example: '',
          description: 'Enter Strong password',
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Login Successful',
    schema: {
      type: 'object',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhMDVkNDE5YmE3NmQwN2Q0N2RjMCIsImlhdCI6MTY5MDI4MDAzMCwiZXhwIjoxNjkwMzY2NDMwfQ.rlIzyBj5IUynbcbb-gXZzllsLU9cPW2ujH2BTka1YrQ',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user);
  }
}
