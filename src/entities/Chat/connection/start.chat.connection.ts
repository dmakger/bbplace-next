import { AppThunk } from "@/storage";
import { chatsReceived, messagesReceived } from "./chat.connection";
import { IConnectionItem } from "@/api/connection/model/connection.model";
import { wrapperConnection } from "@/api/connection/lib/wrapper.connection.lib";
import { EChatOnConnection } from "../data/on.chat.data";
import { IPropsInvokeChats, IPropsInvokeMessages } from "../model/connection.chat.model";
import { getListWithout } from "@/shared/lib/list.lib";


/**
 * Настраивает соединение для события ReceiveChats и вызова GetChatsAndLastMessages
 */
export const setupChatConnection = (propsChats?: IPropsInvokeChats, propsMessages?: IPropsInvokeMessages): AppThunk => {
    const handleReceiveChats = (receivedChats: any[]) => async (dispatch: any) => {
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
    };

    const handleReceiveMessages = (receivedMessages: any[]) => async (dispatch: any) => {
        try {
            if (Array.isArray(receivedMessages) && receivedMessages.every(msg => typeof msg === 'object')) {
                console.log('Parsed received messages:', receivedMessages);
                dispatch(messagesReceived(receivedMessages));
            } else {
                console.error('Invalid data format for received messages:', receivedMessages);
            }
        } catch (error) {
            console.error('Error processing received messages:', error);
        }
    };

    // Определяем IConnectionItem для события ReceiveChats и вызова GetChatsAndLastMessages
    const connectionItems: IConnectionItem[] = getListWithout<IConnectionItem>([
        propsChats ? {
            on: {
                name: EChatOnConnection.Chats,
                handle: handleReceiveChats
            },
            invoke: {
                name: 'GetChatsAndLastMessages',
                props: [propsChats.limit, propsChats.page]
            }
        } : undefined,
        propsMessages ? {
            on: {
                name: EChatOnConnection.Messages,
                handle: handleReceiveMessages
            },
            invoke: {
                name: 'GetMessages',
                props: [propsMessages.chatId, propsMessages.limit, propsMessages.page]
            }
        } : undefined,
    ]);

    // Используем функцию wrapperConnection с определенным connectionItem
    return wrapperConnection(connectionItems);
};
