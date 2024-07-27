'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuMiddle.module.scss'
import { useAppSelector } from "@/storage/hooks"
import { ButtonLink } from "@/shared/ui/Button/data/Link/ButtonLink"

interface IHeaderMenuMiddle {
    className?: string,
}

export const HeaderMenuMiddle = ({ className }: IHeaderMenuMiddle) => {

     //RTK
     const {role} = useAppSelector(state => state.user)
     
    return (
        <div className={cls(cl.HeaderMenuMiddle, className)}>
            {role !== 'Buyer' && 'товары'}
            тендеры
            <ButtonLink title="Отзывы" />
        </div>
    )
}
