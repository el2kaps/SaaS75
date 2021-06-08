import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { DeleteResult, Repository} from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { from, Observable } from 'rxjs';
import { AnswerI } from './entities/answer.interface';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepo: Repository<Answer>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    const new_answer = new Answer();
    new_answer.text = createAnswerDto.text;
    console.log(new_answer.text);
    new_answer.question = createAnswerDto.question;
    console.log(new_answer.question);
    new_answer.author = createAnswerDto.author;
    console.log(new_answer.author);
    //return 'This action adds a new answer';
    console.log('Im HERRE');
    return this.answerRepo.save(new_answer);
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(A_ID: number): Observable<AnswerI> {
    return from(this.answerRepo.findOne({ A_ID }));
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number): Promise<DeleteResult> {
    //return `This action removes a #${id} answer`;
    return await this.answerRepo.delete({ A_ID: id });
  }
}
