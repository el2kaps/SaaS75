import { IsString, IsDate, IsNumber, IsObject } from 'class-validator';

import { Question } from "../../questions/entities/question.entity";
export class CreateKeywordDto {
  @IsString()
  keyword: string;
  @IsNumber()
  Q_ID: number;
}
