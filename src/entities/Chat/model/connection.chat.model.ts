import { IUser } from "@/entities/Auth/model/auth.model"
import { IChat } from "./chat.model"


// ============={ CHATS }=============
/**
 * Аргументы для отправителя чатов
 */
export interface IPropsInvokeChats {
    limit: number
    page: number
}


/**
 * Аргументы для создания чата
 */
export interface IPropsInvokeAddChat {
    userB: IUser['id']
}


/**
 * Аргументы для получения чата по `chatId`
 */
export interface IPropsInvokeGetChatById {
    chatId: IChat['id']
}

// ============={ MESSAGES }=============
/**
 * Аргументы для получения сообщений по `id`
 */
export interface IPropsInvokeMessages {
    chatId: number
    limit: number
    page: number
}

/**
 * Аргументы для отправки сообщений
 */
export interface IPropsInvokeAddMessage {
    chatId: number
    text: string
    attachments: string
}



// ============={ CORE }=============

export interface IPropsChatConnection {
    propsChats?: IPropsInvokeChats, 
    propsGetChatById?: IPropsInvokeGetChatById
    propsAddChat?: IPropsInvokeAddChat

    propsMessages?: IPropsInvokeMessages, 
    propsAddMessage?: IPropsInvokeAddMessage, 
}