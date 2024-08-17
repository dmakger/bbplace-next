import { IPropsInvokeChats, IPropsInvokeMessages } from "../model/connection.chat.model";

/**
 * Дефолтное состояние для `IPropsInvokeChats`
 */
export const INVOKE_CHATS__PROPS_DEFAULT: IPropsInvokeChats = {
    limit: 1600,
    page: 0
}


/**
 * Дефолтное состояние для `IPropsInvokeMessages`
 */
export const INVOKE_MESSAGES__PROPS_DEFAULT: IPropsInvokeMessages = {
    chatId: -1,
    limit: 10000,
    // limit: 10,
    page: 0
}