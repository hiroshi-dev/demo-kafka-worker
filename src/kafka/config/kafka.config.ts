import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from './glossary';

@Injectable()
export class KafkaConfigService {
  constructor(private readonly configService: ConfigService) {}

  get env(): KafkaConfig {
    return {
      broker: this.configService.get<string>('KAFKA_BROKER'),
      accessKey: this.configService.get<string>('KAFKA_ACCESS_KEY'),
      secretKey: this.configService.get<string>('KAFKA_SECRET_KEY'),
    };
  }
}
