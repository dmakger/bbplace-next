import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ViewsNavBarPTC.module.scss'
import { EViewProductParams } from "@/entities/Product/data/params.product.data";
import { PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { ViewButtonsButton } from "@/entities/Product/components/ViewButtons/ViewButtonsProduct";

interface ViewsNavBarPTCProps{
    ptcLink?: string,
    className?: string,
}

export const ViewsNavBarPTC:FC<ViewsNavBarPTCProps> = ({ptcLink, className}) => {
    if (ptcLink === PRODUCTS_ITEM_MENU_WEB_DATA.link)
        return <ViewButtonsButton />
    return <></>
}
