import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { HasKeyword } from './entities/has-keyword.entity';
import { CreateHasKeywordDto } from './dto/create-has-keyword.dto';
import { User } from "./entities/user.entity";

/*
import { CreateQaManagementDto } from './dto/create-qa-management.dto';
import { UpdateQaManagementDto } from './dto/update-qa-management.dto';
*/
@Injectable()
export class QaManagementService {
  constructor(@InjectEntityManager() private manager: EntityManager) {
  }

  async create_question(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    //return 'This action adds a new question';
    if (
      (await this.manager.find(User, {
        where: { UserID: createQuestionDto.author.UserID },
      })) == null
    )
      throw new NotFoundException("User not found");

    const new_question = await this.manager.create(Question, createQuestionDto);
    return this.manager.save(new_question);
  }

  /*create(createQaManagementDto: CreateQaManagementDto) {
    return 'This action adds a new qaManagement';
  }*/

  async create_answer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    //return 'This action adds a new question';
    const new_answer = await this.manager.create(Answer, createAnswerDto);
    return this.manager.save(new_answer);
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.manager.find(Question);
  }

  async findAllAnswers(): Promise<Answer[]> {
    return this.manager.find(Answer);
  }

  /*async viewQuestionAnsws(title: string): Promise<Answer[]> {
    const quest = await this.manager.find(Question, {
      where: { title: title },
    });
    console.log("Question ID");
    console.log(quest[0].Q_ID);
    //return quest;
    return await this.manager.find(Answer, { where: { question: quest } });
  }*/
  async viewQuestionAnsws(id: number) {
    //return `This action returns a #${id} question`;
    return await this.manager.find(Answer, { where: { question: id } });
  }

  /*
    findOne(id: number) {
      return `This action returns a #${id} qaManagement`;
    }
    update(id: number, updateQaManagementDto: UpdateQaManagementDto) {
      return `This action updates a #${id} qaManagement`;
    }
  */
  async remove_question(id: number): Promise<void> {
    //return `This action removes a #${id} qaManagement`;
    return this.manager.transaction(async (manager) => {
      const quest = await manager.findOne(Question, id);
      if (!quest) throw new NotFoundException('Question #${id} not found!');
      await manager.delete(Question, id);
    });
  }

  async remove_answer(id: number): Promise<void> {
    //return `This action removes a #${id} qaManagement`;
    return this.manager.transaction(async (manager) => {
      const answer = await manager.findOne(Answer, id);
      if (!answer) throw new NotFoundException('Answer #${id} not found!');
      await manager.delete(Answer, id);
    });
  }

  async attachkey(createHasKeywordDto: CreateHasKeywordDto) {
    console.log('HEEEEEEEEEEEEELP');
    console.log(createHasKeywordDto.keyword);
    console.log(createHasKeywordDto.question.Q_ID);
    const new_key = await this.manager.create(Keyword, {
      keyword: createHasKeywordDto.keyword,
    });
    await this.manager.save(new_key);
    const has_key = await this.manager.create(HasKeyword, {
      keyword: createHasKeywordDto.keyword,
      Q_ID: createHasKeywordDto.question.Q_ID,
    });
    console.log(has_key.keyword);
    console.log(has_key.Q_ID);
    await this.manager.save(has_key);
    return new_key;
  }

  async searchPerKey(keyword: string) {
    const quest = await this.manager.find(HasKeyword, { keyword: keyword });
    const quest_titles = [];
    for (const element of quest) {
      quest_titles.push(
        await this.manager.find(Question, { Q_ID: element.Q_ID }),
      );
    }
    return quest_titles;
  }

  async createUser(id: number) {
    //return 'This action adds a new question';
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) {
        const new_user = this.manager.create(User, { UserID: id });
        return this.manager.save(new_user);
      }
    });
  }
}

/*import { Injectable } from '@nestjs/common';
import { CreateQaManagementDto } from './dto/create-qa-management.dto';
import { UpdateQaManagementDto } from './dto/update-qa-management.dto';

@Injectable()
export class QaManagementService {
  create(createQaManagementDto: CreateQaManagementDto) {
    return 'This action adds a new qaManagement';
  }

  findAll() {
    return `This action returns all qaManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qaManagement`;
  }

  update(id: number, updateQaManagementDto: UpdateQaManagementDto) {
    return `This action updates a #${id} qaManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} qaManagement`;
  }
}
*/
