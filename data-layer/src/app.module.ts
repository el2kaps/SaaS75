import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./services/authentication/users/users.controller";
import { QaManagementModule } from "./services/qa-management/qa-management.module";
import { UsersModule } from "./services/authentication/users/users.module";
import { StatisticsModule } from "./services/statistics/statistics.module";
import { UserManagementModule } from "./services/user-management/user-management.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    QaManagementModule,
    UsersModule,
    StatisticsModule,
    UserManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
