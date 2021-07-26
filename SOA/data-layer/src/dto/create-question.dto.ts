export class CreateQuestionDto {
  readonly title: string;
  readonly text: string;
  readonly posted_date: Date;
  author: { UserID: number };
}