import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserManagementService } from './user-management.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
//'../authentication/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
//"../dto/update-user.dto";

@Controller('user-management')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly jwtService: JwtService,
  ) {}

  @MessagePattern('user-created')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    console.log("check orcestrator")
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    //channel.ack(orginalMessage);
    console.log( "everything ok");
    //return {str}
    //await this.appService.mySuperLongProcessOfUser(data);
    await this.userManagementService.create_user(data.message);
    channel.ack(orginalMessage);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  viewProfile(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    console.log(json['user'].UserID);
    const UserID = json['user'].UserID;
    if (UserID == null)
      throw new BadRequestException('Something is not okay with JWT token');
    return this.userManagementService.viewProfile(UserID);
  }

  /*@UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    console.log(json['user'].UserID);
    return this.userManagementService.update(
      json['user'].UserID,
      updateUserDto,
    );
  }*/

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagementService.remove(+id);
  }*/
}
