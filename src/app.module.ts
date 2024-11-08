import { Module } from "@nestjs/common";
import { SamplesModule } from "./modules/samples/samples.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "../typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";

const entities = [__dirname + "/../**/*.entity{.ts,.js}"];
const modules = [SamplesModule, AuthModule];

const customImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: [...entities]
  }),
  ...modules
];

@Module({
  imports: [...customImports],
  providers:[]
})
export class AppModule {}
