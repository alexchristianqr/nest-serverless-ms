import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        results: data,
        message: "Request successfully processed",
        status: context.switchToHttp().getResponse().statusCode,
        timestamp: new Date()
      }))
    );
  }
}
