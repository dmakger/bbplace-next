"use client"

import React, { FC, useEffect, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HistoryChat.module.scss'
import { IMessage } from "../../model/chat.model";
import { useAppSelector } from "@/storage/hooks";
import { MessageItem } from "../Message/Item/MessageItem";
import { getDate, getDaysDifference } from "@/shared/lib/dateTime.lib";

interface HistoryChatProps {
    messages?: IMessage[]
    chatId: string
    className?: string,
}

export const HistoryChat:FC<HistoryChatProps> = ({messages=[], chatId, className}) => {
    // RTK
    const { id } = useAppSelector(state => state.user);
    
    // REF
    const chatEndRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // EFFECT
    useEffect(() => {
        if (!chatId || !messages.length) return;

        // Find the index of the first unread message
        const firstUnreadMessage = messages.find(msg => !msg.isRead);
        const firstUnreadId = firstUnreadMessage?.id;
        if (firstUnreadId && messageRefs.current[firstUnreadId]) {
            console.log('qwe YEEES')
            messageRefs.current[firstUnreadId]?.scrollIntoView({ behavior: "smooth" });
        } else {
            // Fallback на прокрутку в конец, если все сообщения прочитаны или нет непрочитанных
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, chatId]);


    return (
        <div className={cls(cl.history, className)}>
            {/* <MessageList myId={id} items={messages} /> */}
            {messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                    {index === 0 || getDaysDifference(messages[index - 1].createdAt, msg.createdAt) > 0 ? (
                        // <DateMessagesAreaDialog date={msg.createdAt}/>
                        <div className={cl.date}>
                            <span>{getDate(msg.createdAt)}</span>
                        </div>
                    ) : null}
                    <MessageItem item={msg} myId={id} key={msg.id} messageRefs={messageRefs} />
                </React.Fragment>
            ))}
            <div ref={chatEndRef} />
        </div>
    )
}
