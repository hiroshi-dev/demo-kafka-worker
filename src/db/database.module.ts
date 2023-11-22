import { Global, Module } from '@nestjs/common';
import { SmashRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmashDao } from './dao';
import { MigrationsService } from './migration.service';

const repositories = [SmashRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SmashDao])],
  providers: [...repositories, MigrationsService],
  exports: [...repositories, MigrationsService],
})
export class DatabaseModule {}
