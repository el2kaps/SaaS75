import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @Column({ default: 0 })
  number_of_answers: number;

  @ManyToOne((type) => User, (user) => user.User_ID)
  author: User;
}
