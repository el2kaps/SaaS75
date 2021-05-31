import { IsString, IsDate, IsNumber, IsEmail} from 'class-validator';
export class CreateUserDto {
  @IsNumber()
  User_ID: number;
}
