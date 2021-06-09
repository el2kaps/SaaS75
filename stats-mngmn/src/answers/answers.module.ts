import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import {Answer} from "./entities/answer.entity";
import {User} from "../users/entities/user.entity";
import {Keyword} from "../keywords/entities/keyword.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../questions/entities/question.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
