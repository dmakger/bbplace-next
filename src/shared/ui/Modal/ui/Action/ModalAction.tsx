import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ModalAction.module.scss'

interface ModalActionProps{
    className?: string,
}

export const ModalAction:FC<ModalActionProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
