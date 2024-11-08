import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class ResponseErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.getResponse() : "Internal server error";

    response.status(status).json({
      success: false,
      results: null,
      message: typeof message === "string" ? message : (message as any).message || "Error",
      status: status,
      timestamp: new Date()
    });
  }
}
