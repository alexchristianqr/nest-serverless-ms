import { AppConfigService } from "../../core/config/app-config.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleOrmEntity } from "./entities/sample.orm-entity";
import { SamplesController } from "./controllers/samples.controller";
import { AuthService } from "../auth/services/auth.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SAMPLE_REPOSITORY } from "./repositories/sample-interface.repository";
import { SampleService } from "./services/sample.service";
import { SampleLocalRepository } from "./repositories/sample-local.repository";
import { HttpClientService } from "../../common/services/http-client.service";

const entities = [__dirname + "/../**/*.entity{.ts,.js}"];

type Logging = true | false | Array<"query" | "schema" | "error" | "warn" | "info">;

let TYPE_LOGGING: Logging;
const envLogging = process.env.TYPE_LOGGING;

if (envLogging) {
  TYPE_LOGGING = envLogging.split(",") as Array<"query" | "schema" | "error" | "warn" | "info">;
} else {
  TYPE_LOGGING = ["error"]; // Valor por defecto
}

const NODE_ENV = process.env.NODE_ENV || "development";

export const samplesConfigModule = {
  imports: [
    HttpModule,
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: process.env.DB_HOST || "localhost",
    //   port: parseInt(process.env.DB_PORT, 10) || 3306,
    //   username: process.env.DB_USERNAME || "root",
    //   password: process.env.DB_PASSWORD || "",
    //   database: process.env.DB_NAME || "db_samples",
    //   entities: entities,
    //   synchronize: NODE_ENV === "development", // No usar en producción, preferir migraciones
    //   autoLoadEntities: true, // Carga las entidades automáticamente
    //   logging: NODE_ENV === "development" ? TYPE_LOGGING : false // Habilita la impresión de queries
    // }),
    // TypeOrmModule.forFeature([SampleOrmEntity])
  ],
  controllers: [SamplesController],
  providers: [
    AppConfigService,
    SampleService,
    AuthService,
    AuthGuard,
    HttpClientService,
    {
      provide: SAMPLE_REPOSITORY,
      useClass: SampleLocalRepository
    }
  ],
  exports: [SampleService, AppConfigService]
};
