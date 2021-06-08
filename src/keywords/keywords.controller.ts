import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

//attach, keyword search (find all questions with that keyword)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  //params: body (keyword, quest_id)
  @Post('attach')
  attachkey(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.attachkey(createKeywordDto);
  }

  //params in url: keyword
  @Get('search/:keyword')
  searchPerKey(@Param('keyword') keyword: string) {
    return this.keywordsService.searchPerKey(keyword);
  }

  /*
  @Get()
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update(+id, updateKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordsService.remove(+id);
  }*/
}
