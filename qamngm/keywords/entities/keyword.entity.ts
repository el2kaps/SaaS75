import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  keyword: string;
  @ManyToMany((type) => Question, { cascade: true })
  @JoinTable({
    name: 'has_keyword',
    joinColumn: { name: 'key_id', referencedColumnName: 'keyword' },
    inverseJoinColumn: { name: 'quest_id', referencedColumnName: 'Q_ID' },
  })
  questions: Question[];
}
