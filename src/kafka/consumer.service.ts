import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerCrashEvent,
  DisconnectEvent,
  EachMessageHandler,
  InstrumentationEvent,
  Kafka,
} from 'kafkajs';
import { KafkaStrategyService } from './strategy.service';
import { Duration } from '@jocular/time';
import { KafkaTopics } from './topics';

const config = {
  sessionTimeout: Duration.minutes(2),
};

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;

  constructor(private kafkaStrategyService: KafkaStrategyService) {
    this.kafka = this.kafkaStrategyService.get();
  }

  async consume(options: ConsumerParams) {
    try {
      console.info('Starting Kafka consumer...');
      const consumer = this.kafka.consumer({
        groupId: 'dgxfuxue-demo-kafka-worker2',
        sessionTimeout: config.sessionTimeout.toMilliseconds(),
      });
      this.registerConsumerEvents(consumer);

      await consumer.connect();
      await consumer.subscribe({
        topics: [KafkaTopics.SMASH],
        fromBeginning: true,
      });
      await consumer.run({
        eachMessage: options.eachMessage,
      });

      console.info('Kafka consumer started');
    } catch (e) {
      console.error('Could not start Kafka consumer', e);
    }
  }

  private registerConsumerEvents(consumer: Consumer) {
    consumer.on('consumer.crash', (event: ConsumerCrashEvent) => {
      console.error('Consumer crashed', { event });
    });
    consumer.on('consumer.disconnect', (event: DisconnectEvent) => {
      console.error('Consumer disconnected', { event });
    });
    consumer.on('consumer.stop', (event: InstrumentationEvent<null>) => {
      console.error('Consumer stopped', { event });
    });
  }

  async onApplicationShutdown() {
    console.info('Disconnecting Kafka consumer...');
    await this.consumer.disconnect();
    console.info('Kafka consumer disconnected');
  }
}

interface ConsumerParams {
  eachMessage: EachMessageHandler;
}
