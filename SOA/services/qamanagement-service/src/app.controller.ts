import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import axios from 'axios';
import { AppService } from './app.service';
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Request, request, response } from "express";

import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { stringify } from "ts-jest/dist/utils/json";
import { CreateHasKeywordDto } from "./dto/create-has-keyword.dto";


@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}

  data_layer_url = 'http://localhost:3000';

  @Post('questions/create')
  //@MessagePattern('login')
  public async create_question(
    //@Payload() data: any,
    //@Ctx() context: RmqContext,
    @Req() request: Request,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      return axios
        .post('http://localhost:3000/questions/create', createQuestionDto,
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

  @Post('answers/create')
  create_answer(
    @Req() request: Request,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      return axios
        .post('http://localhost:3000/answers/create', createAnswerDto,
          {
          headers: {
            Authorization: `Bearer ${token}`,
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
  @Get('questions')
  findAllQuestions(){
    try {
      return axios.get('http://localhost:3000/questions').then((response) => {
        console.log(response.data);
        return response.data;
      });
    } catch (err) {
      console.log(err);
    }
  }
  @Get('answers')
  findAllAnswers(){
    try {
      return axios.get('http://localhost:3000/answers').then((response) => {
        console.log(response.data);
        return response.data;
      });
    } catch (err) {
      console.log(err);
    }
  }
  @Get('view_answers/:id')
  async viewQuestionsAnsws(@Param('id') id: string) {
    console.log(id)
    try {
      return await axios
        .get('http://localhost:3000/view_answers/'+id, { params: { id: id } })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    } catch (err) {
      console.log(err);
    }
  }
  @Post('keywords/attach')
  attachkey(@Req() request: Request, @Body() createHasKeywordDto: CreateHasKeywordDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      return axios
        .post('http://localhost:3000/keywords/attach', createHasKeywordDto,
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
  @Get('keywords/search/:keyword')
  searchPerKey(@Param('keyword') keyword: string){
    try {
      return axios
        .get('http://localhost:3000/keywords/search/'+ keyword, {
          params: {
            keyword: keyword,
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
