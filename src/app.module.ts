import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka';
import { ConfigModule } from './common/config/config.module';
import { initTypeOrm } from './db/typeorm/init';
import { DatabaseModule } from './db';

@Module({
  imports: [
    BaseConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    initTypeOrm(),
    DatabaseModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
