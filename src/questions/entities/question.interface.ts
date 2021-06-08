import {UserI} from "../../user/entities/user.interface";

export interface QuestionI{
    Q_ID:number;
    title:string;
    text:string;
    posted_date?:Date;
    author:UserI;

}