"use client"

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogChat.module.scss'
import { DialogChatHeader } from "../components/Header/DialogChatHeader";
import { HistoryChat } from "../../History/HistoryChat";
import { DialogMessageInput } from "../components/MessageInput/DialogMessageInput";

interface DialogChatProps{
    className?: string,
}

export const DialogChat:FC<DialogChatProps> = ({className}) => {

    return (
        <div className={cls(cl.block, className)}>
            <DialogChatHeader />
            <HistoryChat />
            <DialogMessageInput />
        </div>
    )
}
