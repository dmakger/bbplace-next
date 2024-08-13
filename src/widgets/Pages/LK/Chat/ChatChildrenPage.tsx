"use client"

import { FC, useEffect } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss'
import { useAppSelector } from "@/storage/hooks";
import { startChatSignalRConnection } from "@/entities/Chat/connection/chat.connection";
import connection from "@/api/signalr/signalrClient";

interface ChatChildrenPageProps{
    className?: string,
}

export const ChatChildrenPage:FC<ChatChildrenPageProps> = ({className}) => {
    const { chats } = useAppSelector((state) => state.chat);

    useEffect(() => {
        console.log('Setting up SignalR connection');
        startChatSignalRConnection();
    
        return () => {
            console.log('Cleaning up SignalR connection');
            connection.stop();
        };
    }, [startChatSignalRConnection]);

    console.log('qwe chats', chats)

    return (
        <div className={cls(className)}>

        </div>
    )
}
