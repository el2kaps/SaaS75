import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Keyword } from "../keywords/entities/keyword.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Answer]),TypeOrmModule.forFeature([Keyword])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {
}
