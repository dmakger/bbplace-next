import connection from "@/api/signalr/signalrClient";
import { AppThunk } from "@/storage";
import { chatsReceived, messageReceived } from "./chat.connection";
import { HubConnectionState } from "@microsoft/signalr";

export const startChatSignalRConnection = (): AppThunk => async (dispatch) => {
    try {
        if (connection.state === HubConnectionState.Disconnected) {
            await connection.start();
            console.log('SignalR Connected.');
        }

        // Обработчик для события 'ReceiveChats'
        connection.on('ReceiveChats', (receivedChats) => {
            try {
                if (Array.isArray(receivedChats) && receivedChats.every(chat => typeof chat === 'object')) {
                    console.log('Parsed received chats:', receivedChats);
                    dispatch(chatsReceived(receivedChats));
                } else {
                    console.error('Invalid data format for received chats:', receivedChats);
                }
            } catch (error) {
                console.error('Error processing received chats:', error);
            }
        });

        // Отправляем данные на сервер после успешного подключения
        connection.invoke("GetChatsAndLastMessages", 100, 0)

    } catch (err) {
        console.error('Error while establishing connection: ', err);
        setTimeout(() => dispatch(startChatSignalRConnection()), 5000);
    }
};
