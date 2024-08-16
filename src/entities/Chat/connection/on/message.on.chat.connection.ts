import { IConnectionItem, IOnConnection } from "@/api/connection/model/connection.model";
import { EChatOnConnection } from "../../data/on.chat.data";
import { IMessage } from "../../model/chat.model";
import { IPropsInvokeMessages } from "../../model/connection.chat.model";
import { messageAddReceived, messagesReceived } from "../chat.connection";

// =================={ MESSAGES }==================
/**
 * Обработчик сообщений
 */
const handleReceiveMessages = (receivedMessages: IMessage[]) => async (dispatch: any) => {
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

/**
 * Возвращает `IOnConnection` для обработчика `EChatOnConnection.Messages => ReceiveMessages` 
 */
export const MESSAGES__ON_CONNECTION: IOnConnection = {
    name: EChatOnConnection.Messages,
    handle: handleReceiveMessages,
}


// =================={ DETAIL MESSAGE }==================
const handleReceiveMessage = (receivedMessage: IMessage) => async (dispatch: any) => {
    try {
        dispatch(messageAddReceived(receivedMessage));
    } catch (error) {
        console.error('Error processing received message:', error);
    }
};

/**
 * Возвращает `IOnConnection` для обработчика `EChatOnConnection.Message => ReceiveMessage` 
 */
export const MESSAGE__ON_CONNECTION: IOnConnection = {
    name: EChatOnConnection.Message,
    handle: handleReceiveMessage,
}
