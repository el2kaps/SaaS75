import { IsString, IsDate, IsNumber } from 'class-validator';
import { User } from '../../user/entities/user.entity';
export class CreateQuestionDto {
  @IsNumber()
  Q_ID: number;
  @IsString()
  title: string;
  @IsString()
  text: string;
  @IsDate()
  posted_date: Date;
  author: User;
}

