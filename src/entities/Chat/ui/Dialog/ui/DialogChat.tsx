import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogChat.module.scss'
import { DialogChatHeader } from "../components/header/DialogChatHeader";
import { IChat } from "@/entities/Chat/model/chat.model";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { HistoryChat } from "../../History/HistoryChat";

interface DialogChatProps{
    chatId: IChat['id']
    className?: string,
}

export const DialogChat:FC<DialogChatProps> = ({chatId, className}) => {
    // API
    // const { data: brand } = UserAPI.useGetUserDataQuery(chatId)

    return (
        <div className={cls(cl.block, className)}>
            <DialogChatHeader />
            <HistoryChat />
        </div>
    )
}
