"use client"

import { FC, useEffect } from "react"
import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss'
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { setupChatConnection } from "@/entities/Chat/connection/start.chat.connection";
import { HubConnectionState } from "@microsoft/signalr";
import { ChatDataList } from "@/entities/Chat/ui/ChatData/List/ChatDataList";
import { HistoryChat } from "@/entities/Chat/ui/History/HistoryChat";
import connection from "@/api/connection/lib/connection.lib";
import { INVOKE_CHATS__PROPS_DEFAULT, INVOKE_MESSAGES__PROPS_DEFAULT } from "@/entities/Chat/data/default.chat.data";
import { IPropsInvokeMessages } from "@/entities/Chat/model/connection.chat.model";
import { stopConnection } from "@/api/connection/lib/wrapper.connection.lib";
import { useSearchParams } from "next/navigation";

interface ChatChildrenPageProps {
    className?: string,
}

export const ChatChildrenPage: FC<ChatChildrenPageProps> = ({ className }) => {
    // ROUTE
    const searchParams = useSearchParams();
    const chatId = searchParams.get('id') ?? undefined

    // RTK
    const { chatDataList, messages } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    // EFFECT
    useEffect(() => {  
        if (connection.state === HubConnectionState.Disconnected) {
            const propsMessages = chatId ? {...INVOKE_MESSAGES__PROPS_DEFAULT, chatId: +chatId} as IPropsInvokeMessages : undefined
            dispatch(setupChatConnection(INVOKE_CHATS__PROPS_DEFAULT, propsMessages));
        }
        return () => stopConnection();
    }, [dispatch, chatId]);
    
    console.log('qwe messages:', messages);

    return (
        <div className={cls(cl.page, className)}>
            <ChatDataList items={chatDataList} />
            {chatId && (
                <HistoryChat messages={messages} chatId={chatId} />
            )}
        </div>
    )
}
