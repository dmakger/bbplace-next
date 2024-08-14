/**
 * Аргументы для отправителя чатов
 */
export interface IPropsInvokeChats {
    limit: number
    page: number
}


/**
 * Аргументы для отправителя сообщений
 */
export interface IPropsInvokeMessages {
    chatId: number
    limit: number
    page: number
}
