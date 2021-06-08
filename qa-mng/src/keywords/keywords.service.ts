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
import {KeywordTable} from "./entities/keywordTable.entity";


@Injectable()
export class KeywordsService {
  constructor(
    //@InjectRepository(User)
    //private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    @InjectRepository(KeywordTable)
    private keyTableRepo: Repository<KeywordTable>,
  ) {}

  async attachkey(createKeywordDto: CreateKeywordDto) {
    await this.keyTableRepo.save({ keyword: createKeywordDto.keyword });
    const new_key = this.keywordRepo.save({
      keyword: createKeywordDto.keyword,
      Q_ID: createKeywordDto.Q_ID,
    });
    return new_key;
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
    return this.keywordRepo.find({ keyword: keyword });
  }
}
