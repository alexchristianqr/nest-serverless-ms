import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { HttpClientService } from "../../common/services/http-client.service";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [HttpModule],
  providers: [AuthService, HttpClientService],
  exports: [AuthService]
})
export class AuthModule {}
