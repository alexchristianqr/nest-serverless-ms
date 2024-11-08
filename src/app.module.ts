import { Module } from "@nestjs/common";
import { SamplesModule } from "./modules/samples/samples.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "../typeorm.config";
import { ConfigModule } from "@nestjs/config";

const entities = [__dirname + "/../**/*.entity{.ts,.js}"];
const modules = [SamplesModule];

const customImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: [...entities]
  }),
  ...modules
];

@Module({
  imports: [...customImports]
})
export class AppModule {}
