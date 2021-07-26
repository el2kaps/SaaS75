import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { ExtractJwt} from 'passport-jwt';
import { AuthService  } from "../authentication/auth/auth.service";
import { JwtAuthGuard } from "../authentication/auth/guards/jwt-auth.guard";
import { User } from "../../model/user.entity";
import { async } from "rxjs";
import { UpdateUserDto } from "../../dto/update-user.dto";
/*import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
*/
@Injectable()
export class UserManagementService {
  constructor(@InjectEntityManager() private manager: EntityManager, private authService: AuthService) {}

  //(ExtractJwt.fromAuthHeaderAsBearerToken().payload)
  @UseGuards(JwtAuthGuard)
  async viewProfile(id: number) {
    return this.manager.findOne(User, id);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    //return `This action updates a #${id} userManagement`;
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) throw new NotFoundException('User #${id} not found.');
      /*const hash_pass_observ = this.authService.hashPassword(
        updateUserDto.password,
      );
      console.log("Another problem")
      console.log(hash_pass_observ);
      console.log(typeof hash_pass_observ);
      const hash_pass = await this.authService
        .hashPassword(updateUserDto.password)
      .subscribe(
        (value) => ((updateUserDto.password = value), console.log("------Value-----"),console.log(value),
          console.log(typeof value)
        ),
      );
      console.log("Problem Heree")
      console.log(hash_pass);
      console.log(typeof hash_pass);
      console.log(update_user);
      //const update_user = updateUserDto;
      console.log("updateUserDto.password-before")
      console.log(updateUserDto.password)*/
      updateUserDto.password = await this.authService.hashPassword2(
        updateUserDto.password,
      );
      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }
}
