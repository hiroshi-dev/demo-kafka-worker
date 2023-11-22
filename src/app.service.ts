import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { SmashProto } from './proto/smash.proto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  async onModuleInit() {
    await this.kafkaConsumerService.consume({
      eachMessage: async (payload: EachMessagePayload) => {
        try {
          const { message } = payload;
          await this.handleMessage(decode(message));
        } catch {
          console.error('Could not handle message', payload);
        }
      },
    });
  }

  async handleMessage(message: SmashProto) {
    console.info('Received message', message);
  }

  getHello(): string {
    return 'Hello World!';
  }
}

function decode(message: KafkaMessage): SmashProto {
  return JSON.parse(message.value.toString());
}
