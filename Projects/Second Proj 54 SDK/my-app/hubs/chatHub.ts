import * as signalR from "@microsoft/signalr";
import APP_ENV from "@/env";

let connection: signalR.HubConnection | null = null;

export const createChatConnection = (token: string) => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${APP_ENV.API_BASE_URL}/hubs/chat`, {
            accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

    return connection;
};

export const getChatConnection = () => connection;
