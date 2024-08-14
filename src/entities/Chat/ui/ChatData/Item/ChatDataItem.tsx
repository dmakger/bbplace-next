"use client"

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatDataItem.module.scss'
import { IChatData } from "../../../model/chat.model";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { useAppSelector } from "@/storage/hooks";
import { formatDate } from "@/shared/lib/dateTime.lib";
import { IListItem } from "@/shared/model/list.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getSupplierImage } from "@/entities/Supplier/lib/image.supplier.lib";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface ChatDataItemProps extends IListItem<IChatData> {}

export const ChatDataItem:FC<ChatDataItemProps> = ({
    item: dialog,
    className,
    ...rest
}) => {
    // RTK
    const {id} = useAppSelector(state => state.user)
    
    // API
    const { data: brand } = UserAPI.useGetUserDataQuery(dialog.chat.userA === id ? dialog.chat.userB : dialog.chat.userA)

    return (
        <Link href={DASHBOARD_PAGES.CHATS(dialog.chat.id).path} className={cls(cl.chat, className)}>
            <ImageAPI src={getSupplierImage(brand?.photoId?.key)} toImage={false} width={50} height={50} quality={100} className={cl.image} />
            <div className={cl.middle}>
                <span className={cl.name}>{brand ? brand.brandName : ''}</span>
                <div className={cl.lastMessage}>
                    <span className={cl.lastMessageText}>{dialog.message.text ?? "Диалог создан"}</span>
                </div>
            </div>
            <div className={cl.right}>
                <span className={cl.createdAt}>{formatDate(dialog.message.createdAt)}</span>
            </div>
        </Link>
    )
}
