import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Answer} from "../answers/entities/answer.entity";
import {Between, createQueryBuilder, getRepository, Repository} from "typeorm";
import {Question} from "./entities/question.entity";
import {endOfDay, getDate, getYear, startOfDay} from "date-fns";
import {Keyword} from "../keywords/entities/keyword.entity";
import {Key} from "readline";

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(Keyword) private keyRepo: Repository<Keyword>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all questions`;
  }
  async findAllperdate(date: string){
    console.log("DO smthinh");
    /*const findArgs = {
      where: {
        posted_date.getYear(): newDate.getFullYear(),
        posted_date.getMonth(): newDate.getMonth(),
        posted_date.getDay(): newDate.getDay(),
      },
    };*/
    const startdate = date.concat(' 00:00:00');
    const enddate = date.concat(' 23:59:59');
    const quest = getRepository(Question)
      .createQueryBuilder('question')
      .where('question.posted_date between :date1 and :date2', {
        date1: startdate,
        date2: enddate,
      });
    const ret_quest = await quest.getMany();
    return { ret_quest };
    //return (await this.questionRepo.find(where: {posted_date between }));
    //return await this.questionRepo.find({ posted_date: date });
    //return `This action returns all answers`;
  }

  async countAllperdate(date: string){
    const startdate = date.concat(' 00:00:00');
    const enddate = date.concat(' 23:59:59');
    const quest = await getRepository(Question)
      .createQueryBuilder('question')
      .select('count(question.Q_ID)', 'count')
      .where('question.posted_date between :date1 and :date2', {
        date1: startdate,
        date2: enddate,
      })
      .getRawOne();
    const TotalQuestionsPerDate = quest.count;
    return { TotalQuestionsPerDate };
    //return (await this.questionRepo.find(where: {posted_date between }));
    //return await this.questionRepo.find({ posted_date: date });
    //return `This action returns all answers`;
  }

  async KeywordSearch(key: string) {
    const search = await getRepository(Keyword)
      .createQueryBuilder('Keyword')
      .where('Keyword.keyword = :key', {
        key: key,
      });
    const ret_search = await search.getMany();
    return { ret_search };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
