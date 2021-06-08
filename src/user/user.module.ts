import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../answers/entities/answer.entity';
import { User } from './entities/user.entity';
import { Question } from '../questions/entities/question.entity';
import { Keyword } from '../keywords/entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
