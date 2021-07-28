import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
//import { Transport } from '@nestjs/common/enums/transport.enum';

/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://bgzcrylo:kh390mjDwy0WbyXxPr0OAWcLN371rF7J@snake.rmq2.cloudamqp.com/bgzcrylo'
      ],
      queue: 'esb-soa',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}
bootstrap();
