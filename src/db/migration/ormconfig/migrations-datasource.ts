import { DataSource, DataSourceOptions } from 'typeorm';
import options from './ormconfig.postgres';

// This data source is only for external typeorm script (npm run migrate)
export const dataSource = new DataSource(options as DataSourceOptions);
