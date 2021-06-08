import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../answers/entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { Question } from '../questions/entities/question.entity';
import { Keyword } from './entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService],
})
export class KeywordsModule {}
