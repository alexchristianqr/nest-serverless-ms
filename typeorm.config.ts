import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as dotenv from "dotenv";
dotenv.config();

type Logging = true | false | Array<"query" | "schema" | "error" | "warn" | "info">;

let TYPE_LOGGING: Logging;
const envLogging = process.env.TYPE_LOGGING;

if (envLogging) {
  TYPE_LOGGING = envLogging.split(",") as Array<"query" | "schema" | "error" | "warn" | "info">;
} else {
  TYPE_LOGGING = ["error"]; // Valor por defecto
}

const NODE_ENV = process.env.NODE_ENV || "development";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_samples",
  entities: [],
  synchronize: NODE_ENV === "development", // No usar en producción, preferir migraciones
  autoLoadEntities: true, // Carga las entidades automáticamente
  logging: NODE_ENV === "development" ? TYPE_LOGGING : false // Habilita la impresión de queries
};
