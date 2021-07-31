import { Question } from '../entities/question.entity';

export class CreateAnswerDto {
  readonly text: string;
  readonly posted_date: Date;
  readonly question: Question;
  author: { UserID: number };
}