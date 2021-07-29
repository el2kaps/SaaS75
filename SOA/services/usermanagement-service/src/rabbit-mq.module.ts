import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from "./rabbit-mq.service";
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://bgzcrylo:kh390mjDwy0WbyXxPr0OAWcLN371rF7J@snake.rmq2.cloudamqp.com/bgzcrylo',
          ],
          queue: 'esb-soa',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}