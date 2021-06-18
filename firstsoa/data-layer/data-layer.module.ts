import { Module } from '@nestjs/common';
import { DataLayerService } from './data-layer.service';
import { DataLayerController } from './data-layer.controller';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  controllers: [DataLayerController],
  providers: [DataLayerService],
  imports: [UsersModule, QuestionsModule, AnswersModule, KeywordsModule]
})
export class DataLayerModule {}
