import { Module } from "@nestjs/common";
import { SamplesController } from "./controllers/samples.controller";
import { SampleService } from "./services/sample.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleOrmEntity } from "./entities/sample.orm-entity";
import { SAMPLE_REPOSITORY } from "./repositories/sample-interface.repository";
import { SampleLocalRepository } from "./repositories/sample-local.repository";

const ormEntities = [SampleOrmEntity];

const customImports = [TypeOrmModule.forFeature(ormEntities)];
const customProviders = [
  SampleService,
  {
    provide: SAMPLE_REPOSITORY,
    useClass: SampleLocalRepository
  }
];

@Module({
  imports: [...customImports],
  controllers: [SamplesController],
  providers: [...customProviders],
  exports: [SampleService]
})
export class SamplesModule {}
