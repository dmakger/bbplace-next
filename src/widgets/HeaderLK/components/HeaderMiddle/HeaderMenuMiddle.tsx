'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuMiddle.module.scss'
import { useAppSelector } from "@/storage/hooks"
import { ButtonLink } from "@/shared/ui/Button/data/Link/ButtonLink"
import { Dropdown } from "@/shared/ui/Dropdown"
import { PRODUCT_DROPDOWN_MENU_DATA, TENDER_DROPDOWN_MENU_DATA } from "../../data/headerLK.data"

interface IHeaderMenuMiddle {
    className?: string,
}

export const HeaderMenuMiddle = ({ className }: IHeaderMenuMiddle) => {

     //RTK
     const {role} = useAppSelector(state => state.user)
     
    return (
        <div className={cls(cl.HeaderMenuMiddle, className)}>
            {role !== 'Buyer' && <Dropdown labelTitle="Товары" dropDownListData={PRODUCT_DROPDOWN_MENU_DATA}/>}
            <Dropdown labelTitle="Тендеры" dropDownListData={TENDER_DROPDOWN_MENU_DATA}/>
            <ButtonLink title="Отзывы" />
        </div>
    )
}
