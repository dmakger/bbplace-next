"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import { cls } from '@/shared/lib/classes.lib';
import cl from './_HistoryChat.module.scss'
import { useAppSelector } from "@/storage/hooks";
import { MessageItem } from "../Message/Item/MessageItem";
import { getDateForChat, getDaysDifference } from "@/shared/lib/dateTime.lib";
import { getOtherUserIdByChat } from "../../lib/chat.lib";

interface HistoryChatProps {
    className?: string,
}

export const HistoryChat: FC<HistoryChatProps> = ({ className }) => {
    // RTK
    const { id: myId } = useAppSelector(state => state.user);
    const { messages, currentChat } = useAppSelector((state) => state.chat);
    
    // REF
    const chatEndRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const chatRef = useRef<HTMLDivElement>(null)

    // STATE
    const [currentUserId, setCurrentUserId] = useState<string | undefined>()

    // EFFECT для прокрутки при монтировании
    useEffect(() => {
        if (currentChat)
            setCurrentUserId(getOtherUserIdByChat(currentChat, myId))
    }, [currentChat])

    // EFFECT для прокрутки в самый низ при обновлении messages
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages])

    console.log('qwe m', messages.slice(-1)[0])

    return (
        <div ref={chatRef} className={cls(cl.history, className)}>
            {messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                    {index === 0 || getDaysDifference(messages[index - 1].createdAt, msg.createdAt) > 0 ? (
                        <div className={cl.date}>
                            <span>{getDateForChat(msg.createdAt)}</span>
                        </div>
                    ) : null}
                    <MessageItem item={msg} myId={myId} key={msg.id} messageRefs={messageRefs} />
                </React.Fragment>
            ))}
            <div ref={chatEndRef} />
        </div>
    )
}
