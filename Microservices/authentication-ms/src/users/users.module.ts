import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './models/users.entity';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQModule } from "../rabbit-mq.module";

/*@Module({
  providers: [UsersService]
})
export class UsersModule {}*/

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    AuthModule,
    RabbitMQModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}