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
            'amqps://vgbkiwmc:LJpMgiIi1XWDTVzc_ucFilvVDovZ4ILB@elk.rmq2.cloudamqp.com/vgbkiwmc',
          ],
          queue: 'my-orchestrator',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}