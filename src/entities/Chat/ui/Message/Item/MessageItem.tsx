import React, { FC, useEffect, useRef, useState } from "react";
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
import { FileBlock } from "@/entities/File/ui/Block/FileBlock";
import { IFile } from "@/entities/File/model/file.model";
import { FileAPI } from "@/entities/File/api/file.api";
import { responseFileListToFileList } from "@/entities/File/lib/getter.file.lib";
import { FileWrapList } from "@/entities/File/ui/Wrap/FileWrapList";

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
    // RTK
    const dispatch = useAppDispatch();
    
    // REF
    const messageRef = useRef<HTMLDivElement>(null);

    // API
    const [getFile] = FileAPI.useGetFileMutation()

    // STATE
    const [fileList, setFileList] = useState<IFile[]>([])

    // EFFECT
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

    useEffect(() => {
        if (message.attachments === null) return
        responseFileListToFileList(JSON.parse(message.attachments), getFile).then(r => {
            setFileList(r.newFileList)
        }, e => {
            console.error(e)
        })
    }, [message.attachments])

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
            <div className={cl.body}>
                <div className={cl.text}>{
                    message.text.split('\n').map((it, index) => (
                        <p key={index}>{it}</p>
                    ))
                }</div>
                {fileList.length > 0 && (
                    <FileBlock files={fileList} isRow={false} className={cl.fileList}/>
                )}
            </div>
        </div>
    );
};
