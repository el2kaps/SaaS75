import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Question } from './entities/question.entity';
import { Answer } from "./entities/answer.entity";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from "../authentication/strategies/jwt.strategy";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";

@Module({
  imports:[
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
    }),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService,JwtStrategy, JwtAuthGuard]
})
export class UserManagementModule {}
