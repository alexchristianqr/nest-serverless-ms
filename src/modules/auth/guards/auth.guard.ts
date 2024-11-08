import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1]; // Obtener el token del header "Authorization"

    if (!token) throw new UnauthorizedException("Token no provisto");

    try {
      const userAuthenticated = await this.authService.validateToken(token);
      request.user = userAuthenticated; // Añade los datos del usuario autenticado a la petición

      return true; // Permite el acceso
    } catch {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
