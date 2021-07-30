import { UsersService } from './users.service';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../../../dto/user.interface';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { LoginUserDto } from '../../../dto/login-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
    console.log("My input");
    //console.log(createdUserDto["createdUserDto"]);
    //createdUserDto = createdUserDto["createdUserDto"]
    return this.userService.create(createdUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
    //console.log("iiiiiiiiiiiiiii")
    //console.log(loginUserDto["loginUserDto"])
    //console.log(typeof loginUserDto)
    //loginUserDto["loginUserDto"]
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