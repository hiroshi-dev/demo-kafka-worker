import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './glossary';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { createTypeOrmOptions } from '../typeorm/init';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get env(): DatabaseConfig {
    return {
      host: this.configService.get<string>('DATABASE_HOST'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT')),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_DATABASE'),
    };
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const env = this.env;
    return createTypeOrmOptions(env);
  }
}
