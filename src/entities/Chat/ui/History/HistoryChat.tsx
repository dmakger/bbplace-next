"use client"

import React, { FC, useEffect, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HistoryChat.module.scss'
import { useAppSelector } from "@/storage/hooks";
import { MessageItem } from "../Message/Item/MessageItem";
import { getDateForChat, getDaysDifference } from "@/shared/lib/dateTime.lib";
import { UserAPI } from "@/entities/Auth/api/auth.api";

interface HistoryChatProps {
    className?: string,
}

export const HistoryChat:FC<HistoryChatProps> = ({className}) => {
    // RTK
    const { id: userId } = useAppSelector(state => state.user);
    const { messages } = useAppSelector((state) => state.chat);
    
    // REF
    const chatEndRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // EFFECT
    useEffect(() => {
        if (!messages.length) return;

        const firstUnreadMessage = messages.find(msg => !msg.isRead);
        const firstUnreadId = firstUnreadMessage?.id;
        if (firstUnreadId && messageRefs.current[firstUnreadId]) {
            messageRefs.current[firstUnreadId]?.scrollIntoView({ behavior: "smooth" });
        } else {
            // Fallback на прокрутку в конец, если все сообщения прочитаны или нет непрочитанных
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className={cls(cl.history, className)}>
            {/* <MessageList myId={id} items={messages} /> */}
            {messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                    {index === 0 || getDaysDifference(messages[index - 1].createdAt, msg.createdAt) > 0 ? (
                        <div className={cl.date}>
                            <span>{getDateForChat(msg.createdAt)}</span>
                        </div>
                    ) : null}
                    <MessageItem item={msg} myId={userId} key={msg.id} messageRefs={messageRefs} />
                </React.Fragment>
            ))}
            <div ref={chatEndRef} />
        </div>
    )
}
