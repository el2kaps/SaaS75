import { IsString, IsDate, IsNumber, IsEmail } from 'class-validator';
//import { QuestionI } from '../../questions/entities/question.interface';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
export class CreateAnswerDto {
  @IsNumber()
  A_ID: number;
  @IsString()
  text: string;
  @IsDate()
  posted_date: Date;
  question: Question;
  author: User;
}
