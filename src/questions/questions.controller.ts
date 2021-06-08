import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from './entities/question.entity';

//create (body params),delete (params id in url),view-url params (list all answers per Q_ID)

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  /*@Get('findAll')
  findAll() {
    return this.questionsService.findAll();
  }*/

  @Get('view_answers/:id')
  viewAnsws(@Param('id') id: string): Promise<Question[]> {
    return this.questionsService.viewAnsws(+id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
