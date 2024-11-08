import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { AppModule } from "./app.module";
import { bootstrap } from "./core/bootstrap";
import { SamplesModule } from "./modules/samples/samples.module";

let server: Handler;

export const handler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!server) await bootstrap(AppModule, (serverlessApp: Handler) => (server = serverlessApp));
  return server(event, context, callback);
};
