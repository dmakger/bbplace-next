import { IPropsInvokeChats, IPropsInvokeMessages } from "../model/connection.chat.model";

/**
 * Дефолтное состояние для `IPropsInvokeChats`
 */
export const INVOKE_CHATS__PROPS_DEFAULT: IPropsInvokeChats = {
    limit: 100,
    page: 0
}


/**
 * Дефолтное состояние для `IPropsInvokeMessages`
 */
export const INVOKE_MESSAGES__PROPS_DEFAULT: IPropsInvokeMessages = {
    chatId: -1,
    limit: 100,
    page: 0
}