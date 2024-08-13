"use client"

import { FC, useEffect } from "react"
import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss'
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { startChatSignalRConnection } from "@/entities/Chat/connection/start.chat.connection";
import connection from "@/api/signalr/signalrClient";
import Cookies from 'js-cookie';
import { HubConnectionState } from "@microsoft/signalr";

interface ChatChildrenPageProps {
    className?: string,
}

export const ChatChildrenPage: FC<ChatChildrenPageProps> = ({ className }) => {
    const { chats } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    useEffect(() => {  
        if (connection.state === HubConnectionState.Disconnected) {
            dispatch(startChatSignalRConnection());
        }
    
        return () => {
            if (connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, [dispatch]);

    console.log('Current chats in state:', chats); // Log current state

    return (
        <div className={cls(className)}>
            {/* {chats.map(chat => (
                <div key={chat.id}>
                    <p>Chat ID: {chat.id}</p>
                    <p>Message: {chat.message.text}</p>
                </div>
            ))} */}
        </div>
    )
}
