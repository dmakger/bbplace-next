'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuMiddle.module.scss'
import { useAppSelector } from "@/storage/hooks"
import { Dropdown } from "@/shared/ui/Dropdown"
import { PRODUCT_DROPDOWN_MENU_DATA, TENDER_DROPDOWN_MENU_DATA } from "../../data/headerLK.data"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { WrapperMount } from "@/shared/ui/Wrapper/Mount"

interface IHeaderMenuMiddle {
    className?: string,
}

export const HeaderMenuMiddle = ({ className }: IHeaderMenuMiddle) => {

    //RTK
    const { currentLK } = useAppSelector(state => state.user)
    return (
        <WrapperMount>
            <div className={cls(cl.HeaderMenuMiddle, className)}>
                {currentLK === ECurrentLK.SUPPLIER && <Dropdown labelTitle="Товары" dropDownListData={PRODUCT_DROPDOWN_MENU_DATA} />}
                <Dropdown labelTitle="Тендеры" dropDownListData={TENDER_DROPDOWN_MENU_DATA} />
                {/* <ButtonLink title="Отзывы" /> */}
            </div>
        </WrapperMount>
    )
}
