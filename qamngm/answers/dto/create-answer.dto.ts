import {IsString, IsDate, IsNumber, IsEmail} from 'class-validator';
export class CreateAnswerDto {
  @IsString()
  text: string;
  //@IsDate()
  //posted_date: Date;
  @IsNumber()
  question: number;
  @IsNumber()
  author: number;
}
