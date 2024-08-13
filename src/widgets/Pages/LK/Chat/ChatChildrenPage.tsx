"use client"

import { FC, useEffect } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatChildrenPage.module.scss'
import { useAppSelector } from "@/storage/hooks";
import { useActionCreators } from '@/storage/hooks';
import { startChatSignalRConnection } from "@/entities/Chat/connection/chat.connection";

interface ChatChildrenPageProps{
    className?: string,
}

export const ChatChildrenPage:FC<ChatChildrenPageProps> = ({className}) => {
    const { chats } = useAppSelector((state) => state.chat);

    useEffect(() => {
        startChatSignalRConnection();
    }, [startChatSignalRConnection]);

    console.log('qwe chats', chats)

    return (
        <div className={cls(className)}>

        </div>
    )
}
