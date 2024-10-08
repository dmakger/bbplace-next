'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuRight.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { FAVOURITE_TERTIARY_ICON } from "@/shared/ui/Icon/data/favourite.data.icon"
import { UserProfileBadge } from "@/features/User/UserProfileBadge"
import { Dropdown } from "@/shared/ui/Dropdown"
import { useState } from "react"
import { IMenuItem } from "@/shared/model/menu.model"
import { useAppSelector } from "@/storage/hooks"
import { EWrapperDropdownListPosition } from "@/shared/ui/Wrapper/DropdownList/model/wrapperDropdownList.model"
import { BUYER_HOME_LK_MENU_DATA, LK_MENU_DATA, SELLER_HOME_LK_MENU_DATA } from "../../data/headerLK.data"
import { IMenuButton } from "@/shared/ui/Button/model/button.model"
import { CHAT_HEADER_ICON } from "@/shared/ui/Icon/data/chat.data.icon"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { WrapperMount } from "@/shared/ui/Wrapper/Mount"

interface IHeaderMenuRight {
    className?: string,

}

export const HeaderMenuRight = ({ className }: IHeaderMenuRight) => {
    //STATE
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)

    //RTK
    const { currentLK } = useAppSelector(state => state.user)

    const dropDownListData: IMenuItem[][] | IMenuButton[][] = [
        currentLK !== ECurrentLK.BUYER ? [BUYER_HOME_LK_MENU_DATA] : [SELLER_HOME_LK_MENU_DATA],
        LK_MENU_DATA,
    ]


    return (
        <WrapperMount>
            <div className={cls(cl.HeaderMenuRight, className)}>
                <Button variant={ButtonVariant.DEFAULT}
                    beforeImage={CHAT_HEADER_ICON} beforeProps={{ width: 20, height: 20 }}
                    href={DASHBOARD_PAGES.CHATS('').path}
                    className={cl.button}
                />
                <Button
                    className={cl.button}
                    variant={ButtonVariant.DEFAULT}
                    beforeImage={FAVOURITE_TERTIARY_ICON}
                    beforeProps={{ width: 20, height: 20 }}
                    href={DASHBOARD_PAGES.FAVOURITES.path}
                />

                <Dropdown
                    dropDownListData={dropDownListData}
                    showListData={showProfileMenu}
                    setShowListData={setShowProfileMenu}
                    buttonChildren={
                        <UserProfileBadge showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} />
                    }
                    dropDownListPosition={EWrapperDropdownListPosition.RIGHT}
                />

            </div>
        </WrapperMount>
    )
}
