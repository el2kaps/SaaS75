import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, UseGuards } from "@nestjs/common";
import { UserManagementService } from './user-management.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from "../authentication/auth/guards/jwt-auth.guard";
import { UpdateUserDto } from "../../dto/update-user.dto";
/*import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
*/
@Controller('user/profile')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService,
              private readonly jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  viewProfile(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    console.log(json["user"].UserID);
    const UserID = json["user"].UserID;
    if (UserID == null)
      throw new BadRequestException('Something is not okay with JWT token');
    return this.userManagementService.viewProfile(UserID);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    console.log(json["user"].UserID);
    return this.userManagementService.update(
      json['user'].UserID,
      updateUserDto,
    );
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagementService.remove(+id);
  }*/
}
