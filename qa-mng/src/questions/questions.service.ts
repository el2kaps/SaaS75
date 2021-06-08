import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../answers/entities/answer.entity';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepo: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    //return 'This action adds a new question';
    const new_question = new Question();
    new_question.title = createQuestionDto.title;
    new_question.text = createQuestionDto.text;
    new_question.author = createQuestionDto.author;
    //return 'This action adds a new answer';
    new_question.author = createQuestionDto.author;
    return this.questionRepo.save(new_question);
  }

  findAll() {
    return `This action returns all questions`;
  }

  async viewAnsws(id: number) {
    //return `This action returns a #${id} question`;
    return await this.answerRepo.find({ where: { question: id } });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    //return `This action removes a #${id} question`;
    return await this.questionRepo.delete({ Q_ID: id });
  }
}


