import { IOnConnection } from "@/api/connection/model/connection.model";
import { EChatOnConnection } from "../../data/on.chat.data";
import { IChat, IChatData } from "../../model/chat.model";
import { chatsReceived, currentChatReceived } from "../chat.connection";


// =================={ CHATS }==================
/**
 * Обработчик чатов
 */
const handleReceiveChats = (receivedChats: IChatData[]) => async (dispatch: any) => {
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

/**
 * Возвращает `IOnConnection` для обработчика `EChatOnConnection.Chats => ReceiveChats` 
 */
export const CHATS__ON_CONNECTION: IOnConnection = {
    name: EChatOnConnection.Chats,
    handle: handleReceiveChats
}



// =================={ CHAT }==================
const handleReceiveChatCurrent = (receivedChat: IChat) => async (dispatch: any) => {
    try {
        dispatch(currentChatReceived(receivedChat));
    } catch (error) {
        console.error('Error processing received message:', error);
    }
};

/**
 * Возвращает `IOnConnection` для обработчика `EChatOnConnection.Message => ReceiveMessage` 
 */
export const CHAT__ON_CONNECTION: IOnConnection = {
    name: EChatOnConnection.Chat,
    handle: handleReceiveChatCurrent
}