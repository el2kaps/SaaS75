import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { Question } from '../questions/entities/question.entity';
import { Keyword } from '../keywords/entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
