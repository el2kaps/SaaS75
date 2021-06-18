import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  Q_ID: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_date: Date;

  @ManyToOne((type) => User, (user) => user.UserID)
  author: User;

  @OneToMany((type) => Answer, (answer) => answer.A_ID)
  answers: Answer[];
}