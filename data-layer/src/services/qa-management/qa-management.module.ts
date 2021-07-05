import { Module } from '@nestjs/common';
import { QaManagementService } from './qa-management.service';
import { QaManagementController } from './qa-management.controller';
import { Question } from "../../model/question.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports:[TypeOrmModule.forFeature([Question]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
    }),],
  controllers: [QaManagementController],
  providers: [QaManagementService]
})
export class QaManagementModule {}
