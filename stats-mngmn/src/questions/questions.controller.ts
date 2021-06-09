import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {Between, Equal} from "typeorm";
import { startOfDay, endOfDay } from 'date-fns';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get('date/:dateID')
  findAllperdate(@Param('dateID') dateID: string) {
    return this.questionsService.findAllperdate(dateID);
  }

  @Get('date/count/:dateID')
  countAllperdate(@Param('dateID') dateID: string) {
    return this.questionsService.countAllperdate(dateID);
  }

  @Get('keyword/:key')
  KeywordSearch(@Param('key') key: string) {
    return this.questionsService.KeywordSearch(key);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
