import { FC } from "react"

import { ESupplierView } from "@/entities/Supplier/data/supplier.data";
import { SupplierSmall } from "../Small/SupplierSmall";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { TViewNav } from "@/entities/Supplier/model/nav.supplier.model";
import { BaseSupplier } from "@/entities/Supplier/components/Base/BaseSupplier";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";

interface SupplierAutoProps{
    supplier: ISupplier
    view?: ESupplierView
    hasImage?: boolean
    subscribeView?: ESupplierSubscribeViewItem
    navs?: TViewNav[]
    className?: string,
    classNameName?: string
}

export const SupplierAuto:FC<SupplierAutoProps> = ({supplier, view, hasImage=false, subscribeView=ESupplierSubscribeViewItem.NONE, navs, className, classNameName}) => {
    const props = {supplier, className}
    const propsLarge = {...props, hasImage, subscribeView, navs, classNameName}

    if (view === ESupplierView.SMALL)
        return <SupplierSmall {...props} />
    if (view === ESupplierView.LARGE_GRAY)
        return <BaseSupplier {...propsLarge} isGray={true} />
    if (view === ESupplierView.LARGE_WHITE)
        return <BaseSupplier {...propsLarge} isGray={false} />
    return <></>
}