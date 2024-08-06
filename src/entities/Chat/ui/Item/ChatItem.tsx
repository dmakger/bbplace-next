"use client"

import { FC, useEffect } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatItem.module.scss'
import { IChatData } from "../../model/chat.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { useAppSelector } from "@/storage/hooks";
import { formatDate } from "@/shared/lib/dateTime.lib";

interface ChatItemProps {
    dialog: IChatData
    className?: string,
}

export const ChatItem:FC<ChatItemProps> = ({dialog, className}) => {
    const {id} = useAppSelector(state => state.user)
    const [userData, {data, isLoading}] = UserAPI.useAddUserDataMutation()

    useEffect(() => {
        userData(dialog.chat.userA === id ? dialog.chat.userB : dialog.chat.userA)
    }, [dialog.chat.userA, dialog.chat.userB, id, userData])

    return (
        <div className={cls(cl.chat, className)}>
            {/* <ImageAPI /> */}
            <div className={cl.text}>
                <span className={cl.name}>{data ? data.brandName : ''}</span>
                <div className={cl.lastMessage}>
                    {dialog.message.text ?? "Диалог создан"}
                </div>
            </div>
            <div className={cl.right}>
                <span className={cl.createdAt}>{formatDate(dialog.message.createdAt)}</span>
            </div>
        </div>
    )
}
