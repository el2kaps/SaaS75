import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { KeywordsModule } from './keywords/keywords.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from "./answers/entities/answer.entity";
import { Question } from "./questions/entities/question.entity";
import { Keyword } from "./keywords/entities/keyword.entity";
import { User } from "./users/entities/user.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'falafel9T!@',
      database: 'micros_db',
      entities: ["./entities/**/*.js"],
      synchronize: true,
    }),
    QuestionsModule,
    AnswersModule,
    KeywordsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
