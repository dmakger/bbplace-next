"use client"

import { FC, useEffect, useState } from "react";
import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss';
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { setupChatConnection } from "@/entities/Chat/connection/start.chat.connection";
import { HubConnectionState } from "@microsoft/signalr";
import { ChatDataList } from "@/entities/Chat/ui/ChatData/List/ChatDataList";
import { DialogChat } from "@/entities/Chat/ui/Dialog/ui/DialogChat";
import { stopConnection } from "@/api/connection/lib/wrapper.connection.lib";
import { useSearchParams } from "next/navigation";
import connection from "@/api/connection/lib/connection.lib";
import { INVOKE_CHATS__PROPS_DEFAULT, INVOKE_MESSAGES__PROPS_DEFAULT } from "@/entities/Chat/data/default.chat.data";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { isNumeric } from "@/shared/lib/number.lib";
import { findChatByUserId, findChatByChatId, addChatByUserId } from "@/entities/Chat/connection/invoke/chat.invoke.chat.connection";
import { getMessages } from "@/entities/Chat/connection/invoke/message.invoke.chat.connection";
import { WrapperDefaultChatNotFound } from "@/shared/ui/Wrapper/Default/ui/Chat/NotFound/WrapperDefaultChatNotFound";

interface ChatChildrenPageProps {
    className?: string,
}

export const ChatChildrenPage: FC<ChatChildrenPageProps> = ({ className }) => {
    // ROUTE
    const searchParams = useSearchParams();
    const chatId = searchParams.get('id') ?? undefined

    // RTK
    const { chatDataList, currentChat } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    // STATE
    const [is1024, setIs1024] = useState(false)

    // EFFECT
    useEffect(() => {
        const initiateConnection = async () => {
            if (connection.state === HubConnectionState.Disconnected) {
                await dispatch(setupChatConnection({
                    propsChats: INVOKE_CHATS__PROPS_DEFAULT,
                }));
            }
        };

        const checkAndInitiateConnection = async () => {
            // Ожидание пока соединение полностью не закроется
            if (connection.state === HubConnectionState.Disconnecting) {
                await new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (connection.state === HubConnectionState.Disconnected) {
                            clearInterval(interval);
                            resolve(null);
                        }
                    }, 100); // Проверка каждые 100мс
                });
            }
            initiateConnection();
        };

        checkAndInitiateConnection();

        // return () => {
        //     stopConnection();
        // };
    }, []);

    useEffect(() => {
        if (chatId === undefined) return
        if (isNumeric(chatId)) {
            dispatch(findChatByChatId(+chatId))
        } else {
            dispatch(findChatByUserId(chatId))
        }
    }, [chatId, connection.state])

    useEffect(() => {
        if (!chatId) return
        if (!currentChat) {
            dispatch(addChatByUserId(chatId))
        } else {
            dispatch(getMessages({...INVOKE_MESSAGES__PROPS_DEFAULT, chatId: currentChat.id }))
        }
    }, [currentChat, connection.state])

    return (
        <WrapperDefaultChatNotFound 
            showDefault={chatDataList.length === 0} 
            className={cls(cl.page, is1024 ? cl.inRow : '', className)}
        >
            <ChatDataList items={chatDataList} activeId={chatId ? +chatId : chatId} 
                        className={cls(cl.chats, !is1024 || is1024 && !chatId ? cl.visible : cl.hidden)} />
            <DialogChat className={cls(cl.dialog, chatId ? cl.visible : cl.hidden)} />
            <HandleSize width={1024} set={setIs1024} />
        </WrapperDefaultChatNotFound>
    )
}