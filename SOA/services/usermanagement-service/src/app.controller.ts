import { Body, Controller, Get, Inject, Patch, Req } from "@nestjs/common";
import { AppService } from './app.service';
import { UpdateUserDto } from "./dto/update-user.dto";
import axios from 'axios';
import { Request, request, response } from "express";
import { ClientProxy } from "@nestjs/microservices";
import { RabbitMQService } from "./rabbit-mq.service";


@Controller('user/profile')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,) {}

  @Get()
  viewProfile(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      return axios
        .get('http://localhost:3000/user/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              //request,
            },
          })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  myStatistics(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    this.rabbitMQService.send('my-statistics', { token });
  }

  @Patch()
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      return axios
        .patch('http://localhost:3000/user/profile', updateUserDto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              //request,
            },
          })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err.response.data);
    }
  }
}
