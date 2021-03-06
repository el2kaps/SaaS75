import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbit-mq.service';
import axios from 'axios';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { stringify } from "ts-jest/dist/utils/json";

@Controller('users')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {
  }

  data_layer_url = 'http://localhost:3000';

  /*@Get()
  getHello(): string {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: this.appService.getHello(),
    });
    return 'Message sent to the queue!';
  }*/

  @Post('register')
  async create(@Body() createdUserDto: CreateUserDto) {
    console.log("Axios register")
    return axios
      .post('http://localhost:3000/users/register', createdUserDto)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
    /*try {
      const instance = axios.create();
      const data = await instance.post('http://localhost:3000/users/register', {
        createdUserDto,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }*/
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    /*try {
      const instance = axios.create();
      //const parameters = JSON.stringify(loginUserDto);
      const email = loginUserDto.email;
      const password = loginUserDto.password;
      const data = await instance.post(
        'http://localhost:3000/users/login',
        {loginUserDto });
      console.log("DATA:")
      console.log(data.data)
      return this.rabbitMQService.send('login', data.data);
    } catch (err) {
      console.log(err);
    }*/
    try {
      return axios
        .post('http://localhost:3000/users/login', loginUserDto)
        .catch((err) => {
          if (err.response.status === 404) {
            //return "Possible user not found";
            throw new Error(`${err.config.url} Possible user not found`);
            //return "User not";
          }
          if (err.response.status === 401) {
            //return "Possible user not found";
            throw new Error(`Error 401: Possible user wrong credentials`);
            //return "User not";
          }
          throw err;
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err){
      console.log("Hello");
      return err.response.data;
    }
  }
  @Get("hello")
  async getHello() {
    await this.rabbitMQService.send('rabbit-mq-producer', {
      message: this.appService.getHello(),
    });
    return 'Message sent to the queue!';
  }
}
