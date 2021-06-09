import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {getRepository, Repository} from "typeorm";
import {Question} from "../questions/entities/question.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Keyword} from "../keywords/entities/keyword.entity";
import {Answer} from "../answers/entities/answer.entity";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Question) private questionRepo: Repository<Question>,
              @InjectRepository(Answer) private answRepo: Repository<Answer>,
              @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async countPosts(id: number) {
    const query1 = await getRepository(Question)
        .createQueryBuilder('question')
        .select('count(question.author.User_ID)', 'count')
        .where('question.author.User_ID = :ID', {
          ID: id
        })
        .getRawOne();

    const query2 = await getRepository(Answer)
        .createQueryBuilder('answer')
        .select('count(answer.author.User_ID)', 'count')
        .where('answer.author.User_ID = :ID', {
          ID: id
        })
        .getRawOne();

    const MyQuestions = query1.count;
    const MyAnswers = query2.count;
    return { MyQuestions, MyAnswers };
    //return `This action returns all users`;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
