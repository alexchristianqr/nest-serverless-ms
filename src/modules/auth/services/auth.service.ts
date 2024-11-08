import { Injectable, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AppConfigService } from "../../../core/config/app-config.service";
import { HttpClientService } from "../../../common/services/http-client.service";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClientService,
    // private appConfigService: AppConfigService
  ) {
  }

  async validateToken(token: string) {
    try {
      // const authServiceUrl = this.appConfigService.authServiceUrl; // URL del microservicio de autenticación

      const accessToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzEwNDY5ODEsImV4cCI6MTczMTA0ODc4MX0.RA663TtOKN0Vw8JuBTp9R4D-5HASksbCDPH-yaLxd4o`;
      const response:any = await firstValueFrom(this.http.get(`https://dummyjson.com/auth/me`, {
        headers: {
          Authorization: accessToken,
        },
      }));
      return response; // Retorna los datos del usuario si el token es válido
    } catch (error) {
      throw new UnauthorizedException("Token no válido");
    }
  }
}
