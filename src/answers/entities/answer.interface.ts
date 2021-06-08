//import { Question } from "../../questions/entities/question.entity";
import { UserI } from '../../users/entities/user.interface';
import { QuestionI } from '../../questions/entities/question.interface';

export interface AnswerI {
  A_ID: number;
  text: string;
  posted_date?: Date;
  question: QuestionI;
  author: UserI;
}