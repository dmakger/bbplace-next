"use client"

import { FC, useEffect, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_MessageItem.module.scss'
import { IListItem } from "@/shared/model/list.model";
import { IMessage } from "@/entities/Chat/model/chat.model";
import { IUser } from "@/entities/Auth/model/auth.model";
import { formatDate, dateToString, getDaysDifference, getTime } from "@/shared/lib/dateTime.lib";
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { MESSAGE_STATUS_READ__ICON, MESSAGE_STATUS_SENT__ICON } from "@/shared/ui/Icon/data/messageStatus.data";

interface MessageItemProps extends IListItem<IMessage> {
    myId?: IUser['id']
    messageRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
}

export const MessageItem:FC<MessageItemProps> = ({
    myId,
    messageRefs,

    item: message, 
    className,
    ...rest
}) => {
    // REF
    const messageRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        messageRefs.current[message.id] = messageRef.current;
    }, [messageRefs, message.id]);

    return (
        <div ref={messageRef} className={cls(cl.message, myId === message.sender ? cl.me : cl.other, className)}>
            <div className={cl.date}>
                {myId === message.sender && (
                    <ImageAPI src={message.isRead ? MESSAGE_STATUS_READ__ICON.default : MESSAGE_STATUS_SENT__ICON.default} 
                        width={20} height={20}
                        toImage={false} />
                )}
                <div className={cl.dateText}>{getTime(message.createdAt)}</div>
            </div>
            <span className={cl.text}>{message.text}</span>
        </div>
    )
}
