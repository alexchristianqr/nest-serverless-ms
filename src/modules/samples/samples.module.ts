import { Module } from "@nestjs/common";
import { SamplesController } from "./controllers/samples.controller";
import { SampleService } from "./services/sample.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleOrmEntity } from "./entities/sample.orm-entity";
import { SAMPLE_REPOSITORY } from "./repositories/sample-interface.repository";
import { SampleLocalRepository } from "./repositories/sample-local.repository";
import { AuthService } from "../auth/services/auth.service";
import { HttpClientService } from "../../common/services/http-client.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { HttpModule, HttpService } from "@nestjs/axios";

const ormEntities = [SampleOrmEntity];

const customImports = [HttpModule,TypeOrmModule.forFeature(ormEntities)];
const customProviders = [
  SampleService,
  AuthService,
  HttpClientService,
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
