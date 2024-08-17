import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_DialogMessageInput.module.scss'

interface DialogMessageInputProps{
    className?: string,
}

export const DialogMessageInput:FC<DialogMessageInputProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
