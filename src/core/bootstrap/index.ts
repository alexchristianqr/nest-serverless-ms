import * as dotenv from "dotenv";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ResponseErrorExceptionFilter } from "../../common/exception-filters/response-error.exception-filter";
import { NestFactory } from "@nestjs/core";
import serverless from "serverless-http";
import { AppModule } from "../../app.module";
import { Handler } from "aws-lambda";
import { isProduction, isServerlessApp, host, port, protocol } from "../../shared/utils/environments.util";
import { printLoggerError } from "../../shared/utils/logs.util";

dotenv.config();

// Configura el logger de la aplicación
const useLogger = (app: INestApplication): void => {
  if (isProduction()) {
    app.useLogger(["error", "warn"]); // Solo errores y advertencias en producción
  } else {
    app.useLogger(["log", "error", "warn", "debug", "verbose"]); // Más niveles de log en desarrollo
  }
};

// Configura los pipes de validación globales
const useGlobalPipes = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
      forbidUnknownValues: true
    })
  );
};

// Configura los filtros de excepción globales
const useGlobalFilters = (app: INestApplication): void => {
  app.useGlobalFilters(new ResponseErrorExceptionFilter());
};

// Configura los middlewares globales
/*
  const useMiddlewares = (app: INestApplication): void => {
    const loggingMiddleware = new LoggingMiddleware();
    app.use(loggingMiddleware.use.bind(loggingMiddleware));
  };
*/

// Función que inicializa la aplicación y devuelve el servidor
export const bootstrap = async (module?: any, callback?: Function): Promise<any> => {
  const useModule = module ?? AppModule;
  const app = await NestFactory.create(useModule);

  useLogger(app); // Configura el logger
  useGlobalFilters(app); // Configura los filtros de excepción
  // useGlobalPipes(app); // Configura los pipes de validación
  // useMiddlewares(app); // Configura los middlewares

  // Si es una aplicación serverless, inicializa la aplicación y devuelve el servidor
  if (isServerlessApp() && callback) {
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    const server: Handler = serverless(expressApp);
    callback(server);
  } else {
    await app.listen(port, host).catch(() => printLoggerError("isServerlessApp", "ENV:MODE_APP no esta configurado como una aplicación serverless"));
    console.log(`Application is running on: ${protocol}://${host}:${port}`);
  }
};
