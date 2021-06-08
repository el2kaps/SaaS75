import { Injectable, Inject } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from "./entities/answer.entity";
import { createConnection, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Keyword } from "../keywords/entities/keyword.entity";

@Injectable()
export class AnswersService {
  //create(createAnswerDto: CreateAnswerDto) {
  //  return 'This action adds a new answer';
  //}

  constructor(@InjectRepository(Answer) private answerRepository: Repository<Answer>,@InjectRepository(Keyword) private keywordRepository: Repository<Keyword>) { }


  async findAll(date: string){

    //return await this.answerRepository.find({
     // posted_date: date
    //});

    //return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
