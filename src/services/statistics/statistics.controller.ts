import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { StatisticsService } from './statistics.service';
import { Request } from "express";
import { JwtAuthGuard } from "../authentication/auth/guards/jwt-auth.guard";
import { JwtService } from '@nestjs/jwt';
/*import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
*/
@Controller()
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly jwtService: JwtService,){}

  @Get('answers/date/:dateID')
  findAnswersPerDate(@Param('dateID') dateID: string) {
    return this.statisticsService.findAnswersPerDate(dateID);
  }
  @Get('questions/date/:dateID')
  findQuestionsPerDate(@Param('dateID') dateID: string) {
    return this.statisticsService.findQuestionsPerDate(dateID);
  }

  @Get('questions/date/count/:dateID')
  countQuestionsPerDate(@Param('dateID') dateID: string) {
    return this.statisticsService.countQuestionsPerDate(dateID);
  }

  @Get('lastweek')
  countQuestionsLastWeek() {
    return this.statisticsService.countQuestionsLastWeek();
  }

  @Get('questions/keyword/:key')
  KeywordSearch(@Param('key') key: string) {
    return this.statisticsService.KeywordSearch(key);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myposts')
  countPosts(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    const id = parseFloat(json["user"].UserID);
    return this.statisticsService.countMyPosts(id);
  }
  /*constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsService.update(+id, updateStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(+id);
  }*/
}
