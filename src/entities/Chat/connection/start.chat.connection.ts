import { AppThunk } from "@/storage";
import { IInvokeConnection, IOnConnection } from "@/api/connection/model/connection.model";
import { wrapperConnection } from "@/api/connection/lib/wrapper.connection.lib";
import { IPropsChatConnection, IPropsInvokeAddChat, IPropsInvokeChats, IPropsInvokeMessages } from "../model/connection.chat.model";
import { getListWithout } from "@/shared/lib/list.lib";
import { MESSAGE__ON_CONNECTION, MESSAGES__ON_CONNECTION } from "./on/message.on.chat.connection";
import { CHAT__ON_CONNECTION, CHATS__ON_CONNECTION } from "./on/chat.on.chat.connection";


/**
 * Настраивает соединение для события ReceiveChats и вызова GetChatsAndLastMessages
 */
export const setupChatConnection = ({
    propsChats, propsAddChat, propsGetChatById, 
    propsMessages, propsAddMessage
}: IPropsChatConnection): AppThunk => {
    const onList: IOnConnection[] = [
        CHATS__ON_CONNECTION,
        CHAT__ON_CONNECTION,

        MESSAGES__ON_CONNECTION,
        MESSAGE__ON_CONNECTION,
    ]

    const invokeList: IInvokeConnection[] = getListWithout<IInvokeConnection>([
        propsChats ? {
            name: 'GetChatsAndLastMessages',
            props: [propsChats.limit, propsChats.page],
        } : undefined,
        propsAddChat ? {
            name: 'AddChat',
            props: [propsAddChat],
        } : undefined,
        propsGetChatById ? {
            name: 'FindChatById',
            props: [propsGetChatById?.chatId],
        } : undefined,

        propsMessages ? {
            name: 'GetMessages',
            props: [propsMessages.chatId, propsMessages.limit, propsMessages.page],
        } : undefined,
        propsAddMessage ? {
            name: 'AddMessage',
            props: [propsAddMessage],
        } : undefined,
    ])

    // Используем функцию wrapperConnection с определенным connectionItem
    return wrapperConnection(onList, invokeList);
};


