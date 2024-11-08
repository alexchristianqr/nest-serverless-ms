import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  // GENERAL CONFIGURATION
  get nodeEnv(): string {
    return this.configService.get<string>("NODE_ENV", "development");
  }

  get port(): number {
    return this.configService.get<number>("PORT", 3000);
  }

  get host(): string {
    return this.configService.get<string>("HOST", "localhost");
  }

  get protocol(): string {
    return this.configService.get<string>("PROTOCOL", "http");
  }

  get modeApp(): string {
    return this.configService.get<string>("MODE_APP", "serverless");
  }

  // SERVERLESS CONFIGURATION
  get baseUrl(): string {
    return this.configService.get<string>("BASE_URL", "localhost:3000");
  }

  get url(): string {
    return this.configService.get<string>("URL", `${this.protocol}://${this.baseUrl}`);
  }

  get slsTimeout(): number {
    return this.configService.get<number>("SLS_TIMEOUT", 30);
  }

  // AWS CONFIGURATION
  get awsBucketS3Name(): string {
    return this.configService.get<string>("AWS_BUCKET_S3_NAME");
  }

  get awsRuntime(): string {
    return this.configService.get<string>("AWS_RUNTIME", "nodejs18.x");
  }

  get awsRegion(): string {
    return this.configService.get<string>("AWS_REGION", "us-east-1");
  }

  // COGNITO CONFIGURATION
  get cognitoJwksUri(): string {
    const uri = this.configService.get<string>("AWS_COGNITO_JWKS_URI");
    if (!uri) throw new Error("AWS_COGNITO_JWKS_URI is not defined");
    return uri;
  }

  get cognitoClientId(): string {
    return this.configService.get<string>("AWS_COGNITO_CLIENT_ID");
  }

  get cognitoUserPoolId(): string {
    const userPoolId = this.configService.get<string>("AWS_COGNITO_USER_POOL_ID");
    if (!userPoolId) throw new Error("AWS_COGNITO_USER_POOL_ID is not defined");
    return userPoolId;
  }

  // DATABASE CONFIGURATION
  get dbHost(): string {
    return this.configService.get<string>("DB_HOST", "localhost");
  }

  get dbPort(): number {
    return this.configService.get<number>("DB_PORT", 3306);
  }

  get dbUsername(): string {
    return this.configService.get<string>("DB_USERNAME", "root");
  }

  get dbPassword(): string {
    return this.configService.get<string>("DB_PASSWORD", "");
  }

  get dbName(): string {
    return this.configService.get<string>("DB_NAME", "db_samples");
  }

  // JWT CONFIGURATION
  get authServiceUrl(): string {
    const url = this.configService.get<string>("AUTH_SERVICE_URL");
    if (!url) throw new Error("AUTH_SERVICE_URL is not defined");
    return url;
  }

  get jwtSecret(): string {
    const secret = this.configService.get<string>("JWT_SECRET");
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return secret;
  }

  get typeOrmLogging(): boolean | Array<"query" | "schema" | "error" | "warn" | "info"> {
    const envLogging = this.configService.get<string>("TYPE_LOGGING", "warn,error");
    return envLogging ? (envLogging.split(",") as Array<"query" | "schema" | "error" | "warn" | "info">) : ["error"];
  }

  get isDevelopment(): boolean {
    return this.configService.get<string>("NODE_ENV", "development") === "development";
  }
}
