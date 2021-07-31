import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {getRepository, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import {Question} from "../questions/entities/question.entity";

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepo: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  async findAllperdate(date: string) {
    const startdate = date.concat(' 00:00:00');
    const enddate = date.concat(' 23:59:59');
    const answ = getRepository(Answer)
      .createQueryBuilder('answer')
      .where('answer.posted_date between :date1 and :date2', {
        date1: startdate,
        date2: enddate,
      });
    const ret_answ = await answ.getMany();
    return { ret_answ };
    //return await this.answerRepo.find({ posted_date: date });
    //return `This action returns all answers`;
  }

  findAll() {
    return `This action returns all answers`;
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
