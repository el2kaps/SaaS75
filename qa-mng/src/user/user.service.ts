import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {from, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {Answer} from "../answers/entities/answer.entity";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {UserI} from "./entities/user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Answer)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    //return 'This action adds a new user';
    const new_user = new User();
    new_user.User_ID = createUserDto.User_ID;
    const newUser = await this.userRepo.save(new_user);
    return newUser;
  }

  /*findAll() {
    return `This action returns all user`;
  }

  findOne(User_ID: number): Observable<UserI> {
    //return `This action returns a #${id} user`;
    return from(this.userRepo.findOne({ User_ID }));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
*/
  async remove(id: number) {
    return await this.userRepo.delete({ User_ID: id });
  }
}
