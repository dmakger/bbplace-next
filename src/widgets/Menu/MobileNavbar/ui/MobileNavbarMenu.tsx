'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_MobileNavbarMenu.module.scss'
import { UserProfileBadge } from "@/features/User/UserProfileBadge"
import { Dropdown } from "@/shared/ui/Dropdown"
import { BUYER_HOME_LK_MENU_DATA, LANG_LK_ITEM_MENU_DATA, PRODUCT_DROPDOWN_MENU_DATA, REVIEWS_LK_MENU_DATA, SELLER_HOME_LK_MENU_DATA, SUPPORT_LK_ITEM_MENU_DATA, TENDER_DROPDOWN_MENU_DATA } from "@/widgets/HeaderLK/data/headerLK.data"
import { EUserProfileBadgeVariants } from "@/features/User/UserProfileBadge/model/userProfileBadge.model"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "@/shared/ui/Wrapper/Dropdown/model/wrapperDropdownList.model"
import { IMenuItem } from "@/shared/model/menu.model"
import { IMenuButton } from "@/shared/ui/Button/model/button.model"
import { useAppSelector } from "@/storage/hooks"
import { useState } from "react"

interface IMobileNavbarMenu {
    className?: string,

}

export const MobileNavbarMenu = ({ className }: IMobileNavbarMenu) => {

    //STATE
    const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)

    //RTK
    const { role } = useAppSelector(state => state.user)

    const dropDownListData: IMenuItem[][] | IMenuButton[][] = [
        [
            role !== 'Buyer' ? SELLER_HOME_LK_MENU_DATA : BUYER_HOME_LK_MENU_DATA,
            LANG_LK_ITEM_MENU_DATA,
            SUPPORT_LK_ITEM_MENU_DATA,
        ],
        PRODUCT_DROPDOWN_MENU_DATA,
        TENDER_DROPDOWN_MENU_DATA,
        [REVIEWS_LK_MENU_DATA]
    ]
    return (
        <div className={cls(cl.MobileNavbarMenu, className)}>
            <Dropdown dropDownListData={dropDownListData}
                showListData
                buttonChildren={<UserProfileBadge variant={EUserProfileBadgeVariants.MOBILE} showProfileMenu={showSidebarMenu} setShowProfileMenu={setShowSidebarMenu} />}
                dropDownListVariant={EWrapperDropdownListVariant.MOBILE}
                dropDownListPosition={EWrapperDropdownListPosition.RIGHT} />

        </div>
    )
}
