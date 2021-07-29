import { Controller, Get, Param, Req } from "@nestjs/common";
import { AppService } from './app.service';
import axios from 'axios';
import { Request, request, response } from "express";
//import { RabbitMQService } from "./rabbit-mq.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('answers/date/:dateID')
  async findAnswersPerDate(@Param('dateID') dateID: string) {
    try {
      return await axios
        .get('http://localhost:3000/answers/date/' + dateID, { params: { dateID: dateID } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Get('questions/date/:dateID')
  async findQuestionsPerDate(@Param('dateID') dateID: string) {
    try {
      return await axios
        .get('http://localhost:3000/questions/date/' + dateID, { params: { dateID: dateID } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Get('questions/date/count/:dateID')
  async countQuestionsPerDate(@Param('dateID') dateID: string) {
    try {
      return await axios
        .get('http://localhost:3000/questions/date/count/' + dateID, { params: { dateID: dateID } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Get('questions/keyword/:key')
  async KeywordSearch(@Param('key') key: string) {
    try {
      return await axios
        .get('http://localhost:3000/questions/keyword/' + key, { params: { key: key } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @Get('lastweek')
  async countQuestionsLastWeek() {
    try {
      return await axios
        .get('http://localhost:3000/lastweek/')
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  @MessagePattern('my-statistics')
  public async countPosts(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) //@Get('myposts')
  //async countPosts(@Req() request: Request,)
  {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    const token = data.token;
    //request.headers.authorization.replace('Bearer ', '');
    try {
      return await axios
        .get('http://localhost:3000/myposts', {
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
}
