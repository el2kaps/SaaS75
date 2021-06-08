import {IsString, IsDate, IsNumber, IsObject} from 'class-validator';
import {User} from "../../user/entities/user.entity";
import {Question} from "../../questions/entities/question.entity";
export class CreateKeywordDto {
  @IsString()
  keyword: string;
  @IsObject()
  question: Question;
}
