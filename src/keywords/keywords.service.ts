import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { Keyword } from './entities/keyword.entity';
import { errorObject } from 'rxjs/internal-compatibility';
import { isNullOrUndefined } from 'util';

@Injectable()
export class KeywordsService {
  constructor(
    //@InjectRepository(User)
    //private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
  ) {}

  async attachkey(createKeywordDto: CreateKeywordDto) {
    const new_key = this.keywordRepo.save({
      keyword: createKeywordDto.keyword,
    });
    const quest = this.questionRepo.save({
      Q_ID: createKeywordDto.question.Q_ID,
      title: createKeywordDto.question.title,
      text: createKeywordDto.question.text,
      author: createKeywordDto.question.author,
      posted_date: createKeywordDto.question.posted_date,
    });

   (await new_key).questions.push(Promise.resolve(quest));
    return await quest;
  }

  /*findOne(id: number) {
    //return `This action returns a #${id} keyword`;
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return `This action updates a #${id} keyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }*/
  async searchPerKey(keyword: string) {
    const keyFound = this.keywordRepo.findOne(keyword);
    if (keyFound != null) {
      return (await keyFound).questions;
    }
  }
}
