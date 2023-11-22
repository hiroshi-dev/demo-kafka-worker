import { Global, Module } from '@nestjs/common';
import { KafkaStrategyService } from './strategy.service';
import { KafkaConfigService } from './config/kafka.config';
import { KafkaConsumerService } from './consumer.service';

@Global()
@Module({
  providers: [KafkaConfigService, KafkaStrategyService, KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
