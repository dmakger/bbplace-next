'use client'

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogChatHeader.module.scss'
import { getSupplierImage } from "@/entities/Supplier/lib/image.supplier.lib";
import { useAppSelector } from "@/storage/hooks";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { getOtherUserIdByChat } from "@/entities/Chat/lib/chat.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";


interface DialogChatHeaderProps{
    className?: string,
}

export const DialogChatHeader:FC<DialogChatHeaderProps> = ({className}) => {
    // RTK
    const { id: myId } = useAppSelector(state => state.user)
    const { currentChat } = useAppSelector(state => state.chat);
    
    // API
    const { data: brand } = UserAPI.useGetUserDataQuery(currentChat ? getOtherUserIdByChat(currentChat, myId) : skipToken)    
    
    return (
        <div className={cls(cl.header, className)}>
            <div className={cl.imageWrapper}>
                <ImageAPI src={getSupplierImage(brand?.photoId?.key)} toImage={false} width={50} height={50} quality={100} className={cl.image} />
            </div>
            <span className={cl.name}>{brand ? brand.brandName : ''}</span>
        </div>
    )
}
