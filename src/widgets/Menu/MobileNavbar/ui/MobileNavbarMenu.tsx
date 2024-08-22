'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_MobileNavbarMenu.module.scss'
import { UserProfileBadge } from "@/features/User/UserProfileBadge"
import { Dropdown } from "@/shared/ui/Dropdown"
import { BUYER_HOME_LK_MENU_DATA, LANG_EN_LK_ITEM_MENU_DATA, PRODUCT_DROPDOWN_MENU_DATA, PROFILE_BUTTONS_LK_ITEM_MENU_DATA, REVIEWS_LK_MENU_DATA, SELLER_HOME_LK_MENU_DATA, SUPPORT_LK_ITEM_MENU_DATA, TENDER_DROPDOWN_MENU_DATA } from "@/widgets/HeaderLK/data/headerLK.data"
import { EUserProfileBadgeVariants } from "@/features/User/UserProfileBadge/model/userProfileBadge.model"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "@/shared/ui/Wrapper/DropdownList/model/wrapperDropdownList.model"
import { IMenuItem } from "@/shared/model/menu.model"
import { IMenuButton } from "@/shared/ui/Button/model/button.model"
import { useAppSelector } from "@/storage/hooks"
import { MenuItem } from "@/shared/ui/Button/data/MenuItem/MenuItem"
import { XMARK_MENU_ITEM_ICON } from "@/shared/ui/Icon/data/xmark.data.icon"
import { WrapperColumnNoGap } from "@/shared/ui/Wrapper/ColumnNoGap"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { FAVORITES_LK_MENU_DATA } from "@/features/User/Auth/data/userAuth.data"

interface IMobileNavbarMenu {
    className?: string,
    setShowSidebarMenu: Function
    is420: boolean
}

export const MobileNavbarMenu = ({
    className,
    setShowSidebarMenu,
    is420
}: IMobileNavbarMenu) => {

    //STATE
    const [showProfileButtonsDropdown, setShowProfileButtonsDropdown] = useState<boolean>(false)

    //RTK
    const { role } = useAppSelector(state => state.user)

    //FUNCTIONS
    const closeSidebar = () => setShowSidebarMenu((prevState: boolean) => !prevState);

    //PATHNAME
    const pathname = usePathname()

    //DROPDOWN_LIST_DATA
    const dropDownListData: IMenuItem[][] | IMenuButton[][] = [
        [
            role !== 'Buyer' ? BUYER_HOME_LK_MENU_DATA : SELLER_HOME_LK_MENU_DATA,
            LANG_EN_LK_ITEM_MENU_DATA,
            SUPPORT_LK_ITEM_MENU_DATA,
        ],
        pathname === FAVORITES_LK_MENU_DATA.link && is420 ? [FAVORITES_LK_MENU_DATA] : [],
        role !== 'Buyer' ? PRODUCT_DROPDOWN_MENU_DATA : [],
        TENDER_DROPDOWN_MENU_DATA,
        [REVIEWS_LK_MENU_DATA]
    ]

    return (
        <div className={cls(cl.MobileNavbarMenu, className)}>
            <WrapperColumnNoGap>
                <Dropdown
                    classNameWrapperDropdownList={cl.dropdownProfileButtons}
                    classNameWrapperDropdownListVisible={cl.dropdownProfileButtonsVisible}
                    dropDownListData={[PROFILE_BUTTONS_LK_ITEM_MENU_DATA]}
                    showListData={showProfileButtonsDropdown}
                    buttonChildren={<UserProfileBadge variant={EUserProfileBadgeVariants.MOBILE} showProfileMenu={showProfileButtonsDropdown} setShowProfileMenu={setShowProfileButtonsDropdown} />}
                    dropDownListVariant={EWrapperDropdownListVariant.MOBILE}
                    dropDownListPosition={EWrapperDropdownListPosition.RIGHT} />

                <Dropdown dropDownListData={dropDownListData}
                    showListData
                    dropDownListVariant={EWrapperDropdownListVariant.MOBILE}
                    dropDownListPosition={EWrapperDropdownListPosition.RIGHT} />
            </WrapperColumnNoGap>

            <MenuItem title="Закрыть" onClick={closeSidebar} className={cl.closeButton} beforeImage={XMARK_MENU_ITEM_ICON} />
        </div>
    )
}
