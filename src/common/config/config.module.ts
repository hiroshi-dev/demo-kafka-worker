import { Global, Module } from '@nestjs/common';
import { DatabaseConfigService } from '../../db';

@Global()
@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class ConfigModule {}
