import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HistoryChat.module.scss'
import { IMessage } from "../../model/chat.model";

interface HistoryChatProps {
    messages?: IMessage[]
    className?: string,
}

export const HistoryChat:FC<HistoryChatProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
