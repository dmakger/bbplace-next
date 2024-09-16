"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogChat.module.scss'
import { HistoryChat } from "../../History/HistoryChat";
import { DialogMessageInput } from "../components/MessageInput/DialogMessageInput";
import { DialogChatHeader } from "../components/header/DialogChatHeader";
import { WrapperDefaultChatQuestion } from "@/shared/ui/Wrapper/Default/ui/Chat/Question/WrapperDefaultChatQuestion";
import { useAppSelector } from "@/storage/hooks";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";

interface DialogChatProps{
    className?: string,
}

export const DialogChat:FC<DialogChatProps> = ({className}) => {
    // RTK
    const { currentChat } = useAppSelector(state => state.chat);

    // STATE
    const [is1028, setIs1028] = useState(false)

    // HTML
    return (
        <>
            <HandleSize width={1028} set={setIs1028} />
            <WrapperDefaultChatQuestion showDefault={!currentChat && !is1028} className={cls(cl.block, className)}>
                <DialogChatHeader />
                <HistoryChat />
                <DialogMessageInput />
            </WrapperDefaultChatQuestion>
        </>
    )
}
