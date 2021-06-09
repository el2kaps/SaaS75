import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {Answer} from "../answers/entities/answer.entity";
import {User} from "./entities/user.entity";
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
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
