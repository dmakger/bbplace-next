import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogChatHeader.module.scss'

interface DialogChatHeaderProps{
    className?: string,
}

export const DialogChatHeader:FC<DialogChatHeaderProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
