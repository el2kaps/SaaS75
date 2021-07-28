//import { Question } from '../model/question.entity';

export class CreateAnswerDto {
  readonly text: string;
  readonly posted_date: Date;
  readonly question: { Q_ID: number };
  author: { UserID: number };
}
