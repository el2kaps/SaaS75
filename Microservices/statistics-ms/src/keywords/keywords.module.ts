import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import {Answer} from "../answers/entities/answer.entity";
import {User} from "../users/entities/user.entity";
import {Keyword} from "./entities/keyword.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../questions/entities/question.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule {}
