import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://vgbkiwmc:LJpMgiIi1XWDTVzc_ucFilvVDovZ4ILB@elk.rmq2.cloudamqp.com/vgbkiwmc'
      ],
      queue: 'my-orchestrator',
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

