import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaConfigService } from './config/kafka.config';

@Injectable()
export class KafkaStrategyService {
  private kafka: Kafka;

  constructor(private config: KafkaConfigService) {
    const { broker, accessKey, secretKey } = this.config.env;

    this.kafka = new Kafka({
      brokers: [broker],
      ssl: true,
      sasl: secretKey
        ? {
            mechanism: 'scram-sha-512',
            username: accessKey,
            password: secretKey,
          }
        : undefined,
      authenticationTimeout: 30000,
      reauthenticationThreshold: 30000,
      connectionTimeout: 30000,
      requestTimeout: 60000,
      clientId: 'hiroshi-demo',
    });
  }

  get(): Kafka {
    return this.kafka;
  }
}
