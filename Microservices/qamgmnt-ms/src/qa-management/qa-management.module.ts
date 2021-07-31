import { Module } from '@nestjs/common';
import { QaManagementService } from './qa-management.service';
import { QaManagementController } from './qa-management.controller';
import { Answer } from "./entities/answer.entity";
import { User } from "./entities/user.entity";
import { Keyword } from "./entities/keyword.entity";
import { Question } from "./entities/question.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "../authentication/strategies/jwt.strategy";

@Module({
  imports:[
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Keyword]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
    }),
  ],
  controllers: [QaManagementController],
  providers: [QaManagementService, JwtStrategy ]
})
export class QaManagementModule {}
