export class Question {
  readonly Q_ID: number;
  readonly title: string;
  readonly text: string;
  readonly posted_date: Date;
  readonly author: { UserID: number };
}
