import { Logger } from "@nestjs/common";

/**
 * Función para imprimir logs info en la consola
 * @param context
 * @param message
 */
export const printLogger = (context: string, message?: any) => {
  if (message) {
    Logger.log(message, `${context}`);
  } else {
    Logger.log("", `${context}`);
  }
};

/**
 * Función para imprimir logs de error y warning en la consola
 * @param context
 * @param message
 * @param isWarning
 */
export const printLoggerError = (context: any, message?: any, isWarning: boolean = false) => {
  // Obtener la pila de llamadas
  const stack = new Error().stack;

  // Extraer la línea correspondiente al contexto de la llamada
  let filePath = "";
  let filePathLog = "";

  if (stack) {
    const stackLines = stack.split("\n");
    // La tercera línea de la pila generalmente contiene la llamada al método que queremos capturar
    const callerLine = stackLines[2].trim();

    // Extraer el archivo, línea y método (parsing simple)
    const match = callerLine.match(/\((.*):(\d+):(\d+)\)$/);
    if (match) {
      // console.log(match);
      filePath = match[0]; // Ruta completa del archivo con la línea y columna
      filePathLog = filePath ? ` File: ${match[0]}` : undefined; // Solo el nombre del archivo

      // Habilitar para obtener solo la ruta "SRC" del archivo
      // // Mantener solo la última aparición de 'src' y lo que sigue
      // const lastIndex = filePath.lastIndexOf("src");
      // if (lastIndex !== -1) {
      //   filePath = filePath.substring(lastIndex);
      // }
    }
  }

  // Imprimir el mensaje en la consola
  if (message) {
    if (isWarning) {
      Logger.warn(`${message}`, `${context}${filePathLog}`);
    } else {
      message = JSON.stringify(message);
      Logger.error(`${message}`, `${context}${filePathLog}`);
    }
  } else {
    if (isWarning) {
      Logger.warn("", `${context}${filePathLog}`);
    } else {
      Logger.error("", `${context}${filePathLog}`);
    }
  }
};
