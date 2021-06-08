import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from "./entities/answer.entity";
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('statistics/answers')
export class AnswersController {

  constructor(private readonly answersService: AnswersService) {}

  //@Post()
  //create(@Body() createAnswerDto: CreateAnswerDto) {
  //  return this.answersService.create(createAnswerDto);
  //}

  @Get('date/:dateID')
  findAllperdate(@Param('dateID') dateID: string) {
    return this.answersService.findAll(dateID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
