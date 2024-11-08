import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);
  private readonly defaultTimeout = 5000; // Tiempo de espera en ms
  private readonly maxRetries = 2; // Número de reintentos en caso de fallo

  constructor(private readonly httpService: HttpService) {}

  // Método GET
  get<T>(url: string, config: AxiosRequestConfig = {}): Observable<T> {
    return this.httpService.get<T>(url, config).pipe(
      timeout(this.defaultTimeout),             // Aplica el timeout
      retry(this.maxRetries),                   // Reintentos automáticos en caso de fallo
      map((response: AxiosResponse<T>) => response.data),  // Extrae solo el cuerpo de la respuesta
      tap(() => this.logger.log(`GET request to ${url} succeeded`)), // Log de éxito
      catchError((error) => this.handleRequestError(error, 'GET', url))
    );
  }

  // Método POST
  post<T>(url: string, data: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.httpService.post<T>(url, data, config).pipe(
      timeout(this.defaultTimeout),
      retry(this.maxRetries),
      map((response: AxiosResponse<T>) => response.data),
      tap(() => this.logger.log(`POST request to ${url} succeeded`)),
      catchError((error) => this.handleRequestError(error, 'POST', url))
    );
  }

  // Método PUT
  put<T>(url: string, data: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.httpService.put<T>(url, data, config).pipe(
      timeout(this.defaultTimeout),
      retry(this.maxRetries),
      map((response: AxiosResponse<T>) => response.data),
      tap(() => this.logger.log(`PUT request to ${url} succeeded`)),
      catchError((error) => this.handleRequestError(error, 'PUT', url))
    );
  }

  // Método PATCH
  patch<T>(url: string, data: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.httpService.patch<T>(url, data, config).pipe(
      timeout(this.defaultTimeout),
      retry(this.maxRetries),
      map((response: AxiosResponse<T>) => response.data),
      tap(() => this.logger.log(`PATCH request to ${url} succeeded`)),
      catchError((error) => this.handleRequestError(error, 'PATCH', url))
    );
  }

  // Método DELETE
  delete<T>(url: string, config: AxiosRequestConfig = {}): Observable<T> {
    return this.httpService.delete<T>(url, config).pipe(
      timeout(this.defaultTimeout),
      retry(this.maxRetries),
      map((response: AxiosResponse<T>) => response.data),
      tap(() => this.logger.log(`DELETE request to ${url} succeeded`)),
      catchError((error) => this.handleRequestError(error, 'DELETE', url))
    );
  }

  // Método para manejar errores centralizadamente
  private handleRequestError(error: any, method: string, url: string) {
    const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
    const status = error?.response?.status || 500;

    // Loguear el error
    this.logger.error(`[${method}] Error en ${url}: ${errorMessage} (Status: ${status})`);

    // Lanzar excepción con mensaje claro
    return throwError(() => new HttpException(
      `Error en la solicitud ${method} a ${url}: ${errorMessage}`,
      status,
    ));
  }
}
