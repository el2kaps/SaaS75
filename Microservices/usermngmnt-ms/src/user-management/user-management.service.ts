import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';

import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserManagementService {
  constructor(@InjectEntityManager() private manager: EntityManager){} //private authService: AuthService{}

  //(ExtractJwt.fromAuthHeaderAsBearerToken().payload)
  @UseGuards(JwtAuthGuard)
  async viewProfile(id: number) {
    return this.manager.findOne(User, id);
  }

  async create_user(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    //return 'This action adds a new question';
    const new_user = await this.manager.create(User, createUserDto);
    return this.manager.save(new_user);
  }

  /*update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    //return `This action updates a #${id} userManagement`;
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) throw new NotFoundException('User #${id} not found.');
      updateUserDto.password = await this.authService.hashPassword2(
        updateUserDto.password,
      );
      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }*/
}
