import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { UsersEntity } from './models/user.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from "../../../model/user.entity";

/*@Module({
  providers: [UsersService]
})
export class UsersModule {}*/

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
