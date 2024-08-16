import { IUser } from "@/entities/Auth/model/auth.model"

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
 * Аргументы для отправителя сообщений
 */
export interface IPropsInvokeMessages {
    chatId: number
    limit: number
    page: number
}


export interface IPropsChatConnection {
    propsChats?: IPropsInvokeChats, 
    propsAddChat?: IPropsInvokeAddChat
    propsMessages?: IPropsInvokeMessages, 
}