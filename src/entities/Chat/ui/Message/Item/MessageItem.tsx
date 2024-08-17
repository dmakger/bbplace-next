import React, { FC, useEffect, useRef } from "react";
import { cls } from '@/shared/lib/classes.lib';
import cl from './_MessageItem.module.scss';
import { IListItem } from "@/shared/model/list.model";
import { IMessage } from "@/entities/Chat/model/chat.model";
import { IUser } from "@/entities/Auth/model/auth.model";
import { getTime } from "@/shared/lib/dateTime.lib";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { MESSAGE_STATUS_READ__ICON, MESSAGE_STATUS_SENT__ICON } from "@/shared/ui/Icon/data/messageStatus.data";
import { useAppDispatch } from "@/storage/hooks";
import { markMessageAsRead } from "@/entities/Chat/connection/invoke/message.invoke.chat.connection";

interface MessageItemProps extends IListItem<IMessage> {
    myId?: IUser['id'];
    messageRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
}

export const MessageItem: FC<MessageItemProps> = ({
    myId,
    messageRefs,
    item: message, 
    className,
    ...rest
}) => {
    const dispatch = useAppDispatch();
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageRefs.current[message.id] = messageRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                // Проверка видимости элемента
                if (entry.isIntersecting && messageRef.current) {
                    // Получаем элемент сообщения
                    const element = messageRef.current;

                    // Проверяем, виден ли элемент полностью
                    const isElementFullyVisible = (
                        entry.boundingClientRect.top >= 0 &&
                        entry.boundingClientRect.bottom <= window.innerHeight
                    );

                    // Убедимся, что сообщение не прочитано и не отправлено текущим пользователем
                    if (isElementFullyVisible && !message.isRead && message.sender !== myId) {
                        dispatch(markMessageAsRead(message.id));
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: messageRef.current?.parentElement,
            threshold: 1.0 // Сообщение считается видимым, если полностью видимо
        });

        if (messageRef.current) {
            observer.observe(messageRef.current);
        }

        return () => {
            if (messageRef.current) {
                observer.unobserve(messageRef.current);
            }
        };
    }, [dispatch, message.id, message.isRead, message.sender, myId, messageRefs]);

    return (
        <div ref={messageRef} className={cls(cl.message, myId === message.sender ? cl.me : cl.other, className)}>
            <div className={cl.date}>
                {myId === message.sender && (
                    <ImageAPI
                        src={message.isRead ? MESSAGE_STATUS_READ__ICON.default : MESSAGE_STATUS_SENT__ICON.default}
                        width={20}
                        height={20}
                        toImage={false}
                    />
                )}
                <div className={cl.dateText}>{getTime(message.createdAt)}</div>
            </div>
            <span className={cl.text}>{message.text}</span>
        </div>
    );
};
