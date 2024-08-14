"use client"

import { FC, useEffect, useState } from "react"
import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss'
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { setupChatConnection } from "@/entities/Chat/connection/start.chat.connection";
import { HubConnectionState } from "@microsoft/signalr";
import { ChatDataList } from "@/entities/Chat/ui/ChatData/List/ChatDataList";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { HistoryChat } from "@/entities/Chat/ui/History/HistoryChat";
import connection from "@/api/connection/lib/connection.lib";
import { INVOKE_CHATS__PROPS_DEFAULT, INVOKE_MESSAGES__PROPS_DEFAULT } from "@/entities/Chat/data/default.chat.data";
import { IPropsInvokeMessages } from "@/entities/Chat/model/connection.chat.model";

interface ChatChildrenPageProps {
    className?: string,
}

export const ChatChildrenPage: FC<ChatChildrenPageProps> = ({ className }) => {
    // RTK
    const { chatDataList, messages } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    // STATE
    const [chatId, setChatId] = useState<string | undefined>()
    const [propsInvokeMessages, setPropsInvokeMessages] = useState<IPropsInvokeMessages | undefined>()

    // EFFECT
    useEffect(() => {
        if (chatId === undefined) {
            setPropsInvokeMessages(undefined)
        } else {
            setPropsInvokeMessages(prev => {
                const currentProps = prev === undefined ? INVOKE_MESSAGES__PROPS_DEFAULT : prev
                
                return {...currentProps, chatId: +chatId} as IPropsInvokeMessages
            })
        }
    }, [chatId])

    useEffect(() => {  
        console.log('qwe state', connection.state)
        if (connection.state === HubConnectionState.Disconnected) {
            // dispatch(setupChatConnection(INVOKE_CHATS__PROPS_DEFAULT, propsInvokeMessages));
            const props = chatId ? {...INVOKE_MESSAGES__PROPS_DEFAULT, chatId: +chatId} as IPropsInvokeMessages : undefined
            console.log('qwe props', props)
            dispatch(setupChatConnection(INVOKE_CHATS__PROPS_DEFAULT, props));
        }
    
        return () => {
            if (connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, [dispatch, propsInvokeMessages, chatId]);

    console.log('qwe chatId:', chatId);
    console.log('qwe chats:', chatDataList);
    console.log('qwe messages:', messages);
    console.log('qwe propsInvokeMessages:', propsInvokeMessages);

    return (
        <div className={cls(className)}>
            <ChatDataList items={chatDataList} />
            <SuspenseL>
                <SuspenseL.Any data={[
                    { searchKey: "id", set: setChatId },
                ]}>
                    <HistoryChat />
                </SuspenseL.Any>
            </SuspenseL>
        </div>
    )
}
