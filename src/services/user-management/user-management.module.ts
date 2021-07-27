import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "../authentication/auth/auth.module";
//import { JWT_MODULE_OPTIONS } from "@nestjs/jwt/dist/jwt.constants";

@Module({
  imports:[
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
    }),
    AuthModule,
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService]
})
export class UserManagementModule {}
