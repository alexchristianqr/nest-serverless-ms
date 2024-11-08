import { Module } from "@nestjs/common";
import { SamplesModule } from "./modules/samples/samples.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";

const modules = [SamplesModule, AuthModule];

const customImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  ...modules
];

@Module({
  imports: [...customImports],
  providers:[]
})
export class AppModule {}
