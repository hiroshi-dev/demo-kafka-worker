import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmNamingStrategy } from './typeorm-naming-strategy';
import { DatabaseConfig, DatabaseConfigService } from '..';

export const initTypeOrm = () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (databaseConfigService: DatabaseConfigService) =>
      databaseConfigService.createTypeOrmOptions(),
    inject: [DatabaseConfigService],
  });

export function createTypeOrmOptions(
  config: DatabaseConfig,
  prod = true,
): TypeOrmModuleOptions {
  const root = prod ? 'dist' : 'src/**/';

  const entities = `${root}/db/dao/*.dao.{ts,js}`;
  const migrations = `${root}/db/migration/*.{ts,js}`;

  return {
    type: 'postgres',
    entities: [entities],
    migrations: [migrations],
    namingStrategy: new TypeOrmNamingStrategy(),
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
  };
}
