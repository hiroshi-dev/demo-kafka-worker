import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { SmashProto } from './proto/smash.proto';
import { SmashModel } from './model/smash.model';
import { SmashRepository } from './db';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private readonly smashRepository: SmashRepository,
  ) {}

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
    console.info('Handling message', { message });
    const model: SmashModel = {
      id: message.flyId,
      createdAt: new Date(),
      smashedAt: new Date(message.metadata.createdAt),
    };

    await this.smashRepository.create(model);
    console.info('Handled message');
  }

  getHello(): string {
    return 'Hello World!';
  }
}

function decode(message: KafkaMessage): SmashProto {
  return JSON.parse(message.value.toString());
}
