import { Injectable } from "@nestjs/common";
import { Sample } from "../entities/sample.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SampleOrmEntity } from "../entities/sample.orm-entity";
import { SampleInterfaceRepository } from "./sample-interface.repository";

@Injectable()
export class SampleMysqlRepository implements SampleInterfaceRepository {
  constructor(
    @InjectRepository(SampleOrmEntity)
    private readonly repository: Repository<SampleOrmEntity>
  ) {}

  async findAll(): Promise<Sample[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Sample | null> {
    return this.repository.findOneBy({ id });
  }

  async save(sample: Partial<Sample>): Promise<any> {
    return this.repository.save(sample);
  }

  async update(id: number, sample: Partial<Sample>): Promise<any> {
    return this.repository.update(id, sample);
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
