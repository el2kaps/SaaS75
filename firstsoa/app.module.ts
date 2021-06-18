import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestansModule } from './questans/questans.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DataLayerModule } from './data-layer/data-layer.module';
import { AnswersModule } from './questans/answers/answers.module';
import { QuestionsModule } from './questans/questions/questions.module';
import { KeywordsModule } from './questans/keywords/keywords.module';
import { UsersModule } from './questans/users/users.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [QuestansModule, AuthenticationModule, DataLayerModule, AnswersModule, QuestionsModule, KeywordsModule, UsersModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
