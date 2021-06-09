import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { KeywordsModule } from './keywords/keywords.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(),AnswersModule, KeywordsModule, QuestionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
