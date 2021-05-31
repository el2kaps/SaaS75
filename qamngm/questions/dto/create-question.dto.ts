import { IsString, IsDate, IsNumber } from 'class-validator';
export class CreateQuestionDto {
    @IsString()
    title: string;
    @IsString()
    text: string;
    @IsDate()
    posted_date: Date;
    @IsNumber()
    question: number;
    @IsString()
    author: string;
    @IsNumber()
    number_of_answers: number;
}

