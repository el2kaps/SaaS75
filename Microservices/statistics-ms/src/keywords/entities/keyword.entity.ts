import {Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Keyword {
  @PrimaryColumn()
    keyword: string;
    @PrimaryColumn()
    Q_ID: number;
}