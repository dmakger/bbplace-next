import { getAccessToken, getHeaderAuthorization } from "@/entities/Auth/lib/auth-token.lib";
import * as signalR from "@microsoft/signalr";
import { HttpTransportType, JsonHubProtocol } from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
	.withUrl("wss://bbplace.ru/ws", {
		accessTokenFactory: () => getAccessToken() ?? '',
		headers: getHeaderAuthorization(),
		skipNegotiation: true,
		transport: HttpTransportType.WebSockets,
	})
	.withAutomaticReconnect()
	.configureLogging(signalR.LogLevel.Debug)
	.build();

export default connection;
