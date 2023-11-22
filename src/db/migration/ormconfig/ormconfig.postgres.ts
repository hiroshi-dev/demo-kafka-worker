import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmNamingStrategy } from '../../typeorm/typeorm-naming-strategy';
import { ROOT_DIRECTOY } from '../../../common/consts';

const DB_DIRECTORY = `${ROOT_DIRECTOY}/src/db`;

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'hiroshi',
  entities: [`${DB_DIRECTORY}/dao/*.dao.{ts,js}`],
  migrations: [`${DB_DIRECTORY}/migrartion/*.{ts,js}`],
  namingStrategy: new TypeOrmNamingStrategy(),
};

export default options;
