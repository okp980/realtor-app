import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async register(body: CreateAuthDto): Promise<AuthResponseDto | undefined> {
    // @ts-ignore
    const { id, ...user } = await this.userService.createUser(body);
    return {
      // @ts-ignore
      access_token: this.jwtService.sign({ id }),
      user_type: user.userType,
    };
  }

  login(user: any) {
    const payload = { id: user.id };

    const response: AuthResponseDto = {
      access_token: this.jwtService.sign(payload),
      user_type: user.userType,
    };
    return response;
  }

  getProfile(user: any) {
    return user;
  }
}
