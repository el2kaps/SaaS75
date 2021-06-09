import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import {User} from "../users/entities/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import {Answer} from "../answers/entities/answer.entity";
import {Keyword} from "../keywords/entities/keyword.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
