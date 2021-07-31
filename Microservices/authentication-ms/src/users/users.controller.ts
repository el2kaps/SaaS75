import { UsersService } from './users.service';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from './models/users.interface';
import { CreateUserDto } from './models/dto/CreateUser.dto';
import { LoginUserDto } from './models/dto/LoginUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RabbitMQService } from '../rabbit-mq.service';
//import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Post('register')
  async create(
    @Body() createdUserDto: CreateUserDto,
  ): Promise<Observable<UserI>> {
    //return
    //return this.userService.create(createdUserDto);
    //this.client.emit('user-created', { createdUserDto });
    const new_user = await this.userService.create(createdUserDto);
    console.log('new user');
    console.log(new_user);
    const name = new_user['name'];
    const email = new_user['email'];
    const UserID = new_user['UserID'];
    this.rabbitMQService.send('user-created', {
      message: {
        createdUserDto
      },
    });
    console.log('Message sent to the queue!');
    return new_user;
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
    return this.userService.login(loginUserDto).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000,
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request): Observable<UserI[]> {
    return this.userService.findAll();
  }
}
