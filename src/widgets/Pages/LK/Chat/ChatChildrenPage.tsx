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
    const [currentChatId, setCurrentChatId] = useState<string | undefined>();

    // EFFECT
    useEffect(() => {
        const initiateConnection = async () => {
            if (connection.state === HubConnectionState.Disconnected && currentChatId !== chatId) {
                setCurrentChatId(chatId);
                const propsMessages = chatId ? { ...INVOKE_MESSAGES__PROPS_DEFAULT, chatId: +chatId } : undefined;
                await dispatch(setupChatConnection({
                    propsChats: INVOKE_CHATS__PROPS_DEFAULT,
                    propsMessages,
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

        return () => {
            console.log('qwe destroy');
            stopConnection();
        };
    }, [chatId]);

    console.log('qwe currentChat', currentChat)

    return (
        <div className={cls(cl.page, className)}>
            <ChatDataList items={chatDataList} activeId={chatId ? +chatId : chatId} />
            {chatId && (
                <DialogChat chatId={+chatId} />
            )}
        </div>
    )
}