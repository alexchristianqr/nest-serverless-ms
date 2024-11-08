import { Module } from "@nestjs/common";
import { samplesConfigModule } from "./samples-config.module";


@Module(samplesConfigModule)
export class SamplesModule {}
