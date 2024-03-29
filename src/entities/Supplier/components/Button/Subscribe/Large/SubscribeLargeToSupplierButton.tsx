import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SubscribeLargeToSupplierButton.module.scss'

interface SubscribeLargeToSupplierButtonProps{
    className?: string,
}

export const SubscribeLargeToSupplierButton:FC<SubscribeLargeToSupplierButtonProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
