import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from './question.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Answer, (answer) => answer.A_ID)
  @JoinColumn({ name: 'MyAnswers' })
  my_answers: Answer[];

  @OneToMany((type) => Question, (question) => question.Q_ID)
  @JoinColumn({ name: 'MyQuestions' })
  my_questions: Answer[];
}