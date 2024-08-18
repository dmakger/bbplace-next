"use client"

import { FC } from "react"
import Link from "next/link";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatDataItem.module.scss'
import { IChatData } from "../../../model/chat.model";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { useAppSelector } from "@/storage/hooks";
import { formatDate } from "@/shared/lib/dateTime.lib";
import { IListItem } from "@/shared/model/list.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getSupplierImage } from "@/entities/Supplier/lib/image.supplier.lib";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { getOtherUserIdByChat } from "@/entities/Chat/lib/chat.lib";


interface ChatDataItemProps extends IListItem<IChatData> {}

export const ChatDataItem:FC<ChatDataItemProps> = ({
    item: dialog,
    activeId,
    isActive=false,
    className,
    ...rest
}) => {
    // RTK
    const {id} = useAppSelector(state => state.user)
    
    // API
    const { data: brand } = UserAPI.useGetUserDataQuery(getOtherUserIdByChat(dialog.chat, id))

    return (
        <Link href={DASHBOARD_PAGES.CURRENT_CHAT(dialog.chat.id).path} className={cls(cl.chat, isActive || activeId === dialog.chat.id ? cl.active : '', className)}>
            <div className={cl.imageWrapper}>
                <ImageAPI src={getSupplierImage(brand?.photoId?.key)} toImage={false} width={50} height={50} quality={100} className={cl.image} />
            </div>
            <div className={cl.middle}>
                <span className={cl.name}>{brand ? brand.brandName : ''}</span>
                <div className={cl.lastMessage}>
                    <span className={cl.lastMessageText}>{dialog.message.text ?? "Диалог создан"}</span>
                </div>
            </div>
            <div className={cl.right}>
                <span className={cl.createdAt}>{formatDate(dialog.message.createdAt)}</span>
                {!dialog.message.isRead && brand && dialog.message.sender === brand?.id && (
                    <span className={cl.unread}> 1+ </span>
                )}
            </div>
        </Link>
    )
}
