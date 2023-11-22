import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationsService {
  constructor(private readonly dataSource: DataSource) {}

  async runMigrations() {
    await this.dataSource.runMigrations({ transaction: 'all' });
  }
}
