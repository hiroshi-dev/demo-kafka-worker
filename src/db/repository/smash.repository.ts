import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SmashDao } from '../dao';
import { SmashModel } from '../../model/smash.model';

@Injectable()
export class SmashRepository {
  constructor(
    @InjectRepository(SmashDao)
    private readonly repository: Repository<SmashDao>,
  ) {}

  async create(model: SmashModel): Promise<SmashModel> {
    const dao = toDao(model);
    await this.repository.save(dao);
    return model;
  }

  async findAll(): Promise<SmashModel[]> {
    const daos = await this.repository.find();
    return daos.map((s) => toModel(s));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}

function toModel(dao: SmashDao): SmashModel {
  return {
    id: dao.id,
    createdAt: dao.createdAt,
    smashedAt: dao.smashedAt,
  };
}

function toDao(model: SmashModel): SmashDao {
  return new SmashDao({
    id: model.id,
    createdAt: model.createdAt,
    smashedAt: model.smashedAt,
  });
}
