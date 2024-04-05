import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductVList.module.scss'

interface ProductVListProps{
    className?: string,
}

export const ProductVList:FC<ProductVListProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
