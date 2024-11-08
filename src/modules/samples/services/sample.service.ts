import { Sample } from "../entities/sample.entity";
import { Inject, Injectable } from "@nestjs/common";
import { SampleDto } from "../dtos/sample.dto";
import { SAMPLE_REPOSITORY, SampleInterfaceRepository } from "../repositories/sample-interface.repository";

@Injectable()
export class SampleService {
  constructor(@Inject(SAMPLE_REPOSITORY) private readonly repositoryMysql: SampleInterfaceRepository) {}

  updateSample(id: number, data: SampleDto): Promise<Sample | null> {
    return this.repositoryMysql.update(id, data);
  }

  deleteSample(id: number): Promise<boolean> {
    return this.repositoryMysql.delete(id);
  }

  createSample(createSampleDto: SampleDto): Promise<Sample> {
    // const newSample = new Sample(createSampleDto);
    return this.repositoryMysql.save(createSampleDto);
  }

  getSampleById(id: number): Promise<Sample | null> {
    return this.repositoryMysql.findById(id);
  }

  getSamples(): Promise<Sample[]> {
    return this.repositoryMysql.findAll();
  }
}
