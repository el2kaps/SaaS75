import {
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class HasKeyword {
  @PrimaryColumn()
  keyword: string;
  @PrimaryColumn()
  question: Question;
}
