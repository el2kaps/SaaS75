import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne((type) => User, (user) => user.User_ID)
  author: User;
}
