import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../authentication/auth/guards/jwt-auth.guard";
import { QaManagementService } from './qa-management.service';
import { CreateQuestionDto } from '../../dto/create-question.dto';
import { Question } from "../../model/question.entity";
import { Answer } from "../../model/answer.entity";
import { CreateAnswerDto } from "../../dto/create-answer.dto";
import { CreateKeywordDto } from "../../dto/create-keyword.dto";
import { CreateHasKeywordDto } from "../../dto/create-has-keyword.dto";
import { JwtService } from "@nestjs/jwt";
import { Request, request } from "express";
import { User } from "../../model/user.entity";
//import { UpdateQaManagementDto } from './dto/update-qa-management.dto';

@Controller()
export class QaManagementController {
  constructor(
    private readonly qaManagementService: QaManagementService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('questions/create')
  create_question(@Req() request: Request,@Body() createQuestionDto: CreateQuestionDto) {
    console.log(createQuestionDto);
    const jwt = request.headers.authorization.replace('Bearer ', '');
    console.log(jwt);
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    console.log(json['user'].UserID);
    const UserID = json["user"].UserID;
    if (UserID == null)
      throw new BadRequestException('Something is not okay with JWT token');
    createQuestionDto.author = UserID;
    return this.qaManagementService.create_question(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('answers/create')
  create_answer(@Req() request: Request, @Body() createAnswerDto: CreateAnswerDto) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    console.log(json["user"].UserID);
    const UserID = json["user"].UserID;
    if (UserID == null)
      throw new BadRequestException('Something is not okay with JWT token');
    createAnswerDto.author = UserID;
    return this.qaManagementService.create_answer(createAnswerDto);
  }

  @Get('questions')
  findAllQuestions() {
    return this.qaManagementService.findAllQuestions();
  }

  @Get('answers')
  findAllAnswers() {
    return this.qaManagementService.findAllAnswers();
  }

  /*@Get('view_answers/:title')
  async viewQuestionAnsws(@Param('title') title: string): Promise<Answer[]> {
    return await this.qaManagementService.viewQuestionAnsws(title);
  }*/

  @Get('view_answers/:id')
  viewQuestionsAnsws(@Param('id') id: string){
    return this.qaManagementService.viewQuestionAnsws(+id);
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qaManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQaManagementDto: UpdateQaManagementDto) {
    return this.qaManagementService.update(+id, updateQaManagementDto);
  }*/

  @UseGuards(JwtAuthGuard)
  @Delete('delete_question/:id')
  remove_question(@Param('id') id: string) {
    return this.qaManagementService.remove_question(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete_answer/:id')
  remove_answer(@Param('id') id: string) {
    return this.qaManagementService.remove_answer(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('keywords/attach')
  attachkey(@Body() createHasKeywordDto: CreateHasKeywordDto) {
    return this.qaManagementService.attachkey(createHasKeywordDto);
  }

  //params in url: keyword
  @Get('keywords/search/:keyword')
  searchPerKey(@Param('keyword') keyword: string) {
    return this.qaManagementService.searchPerKey(keyword);
  }

}
