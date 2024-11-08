import { Injectable, UnauthorizedException } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { AppConfigService } from "../config/app-config.service";

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private appConfigService: AppConfigService
  ) {}

  async validateToken(token: string) {
    try {
      const authServiceUrl = this.appConfigService.authServiceUrl; // URL del microservicio de autenticación

      const response = await lastValueFrom(
        this.httpService.post(`${authServiceUrl}/auth/validate`, {
          token
        })
      );
      return response.data; // Retorna los datos del usuario si el token es válido
    } catch (error) {
      throw new UnauthorizedException("Token no válido");
    }
  }
}
