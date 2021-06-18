import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  A_ID: number;

  @Column({ nullable: false })
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_date: Date;

  @ManyToOne((type) => Question, (question) => question.Q_ID)
  question: Question;

  @ManyToOne((type) => User, (user) => user.UserID, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: User;
}