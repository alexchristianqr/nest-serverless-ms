import * as dotenv from "dotenv";
import { printLoggerError } from "./logs.util";

dotenv.config();

// Función que comprueba si la aplicación es serverless
export const isServerlessApp = (): boolean => {
  const modeServerless = process.env.MODE_APP === "serverless";
  if (!modeServerless) printLoggerError("isServerlessApp", "ENV:MODE_APP no esta configurado como una aplicación serverless", true);
  return modeServerless;
};

// Función que comprueba si el entorno es de producción
export const isProduction = (): boolean => process.env.NODE_ENV === "production";

export const host = process.env.HOST ?? "localhost";
export const port = process.env.PORT ?? 3000;
export const protocol = process.env.PROTOCOL ?? "http";
