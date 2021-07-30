import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, getRepository } from "typeorm";
import { Answer } from "../../model/answer.entity";
import { Question } from "../../model/question.entity";
import { Keyword } from "../../model/keyword.entity";
import { HasKeyword } from "../../model/has-keyword.entity";
/*import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
*/
@Injectable()
export class StatisticsService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async findAnswersPerDate(date: string) {
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
  async findQuestionsPerDate(date: string){
    console.log("DO smthinh");
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
  }

  async countQuestionsPerDate(date: string){
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
  }
  async countQuestionsLastWeek(){
    const quest = await getRepository(Question)
      .createQueryBuilder('question')
      .select('count(question.Q_ID)', 'count')
      .where('question.posted_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)')
      .getRawOne();
    const TotalQuestionsLastWeek = quest.count;
    return { TotalQuestionsLastWeek };
  }

  async KeywordSearch(key: string) {
    const search = await getRepository(HasKeyword)
      .createQueryBuilder('Keyword')
      .select("count(Keyword.keyword)", 'count')
      .where('Keyword.keyword = :key', {
        key: key,
      })
      .getRawOne();
    const ret_search = search.count;
    return { "Number of questions with given keyword:": ret_search };
  }

  async countMyPosts(id: number) {
    const query1 = await getRepository(Question)
      .createQueryBuilder('question')
      .select('count(question.author.UserID)', 'count')
      .where('question.author.UserID = :ID', {
        ID: id
      })
      .getRawOne();

    const query2 = await getRepository(Answer)
      .createQueryBuilder('answer')
      .select('count(answer.author.UserID)', 'count')
      .where('answer.author.UserID = :ID', {
        ID: id
      })
      .getRawOne();

    const MyQuestions = query1.count;
    const MyAnswers = query2.count;
    return { MyQuestions, MyAnswers };
    //return `This action returns all users`;
  }

}
