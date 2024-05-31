import { FC } from "react"

import { ESupplierView } from "@/entities/Supplier/data/supplier.data";
import { SupplierSmall } from "../Small/SupplierSmall";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { TViewNav } from "@/entities/Supplier/model/nav.supplier.model";
import { BaseSupplier } from "@/entities/Supplier/components/Base/BaseSupplier";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { IImageSizes } from "@/shared/model/image.model";

interface SupplierAutoProps {
    supplier: ISupplier
    view?: ESupplierView
    hasImage?: boolean
    subscribeView?: ESupplierSubscribeViewItem
    navs?: TViewNav[],
    supplierRating?: number,
    classNameSmallSupplier?: string,
    classNameSupplier?: string,
    classNameName?: string,
    imageSizes?: IImageSizes
}

export const SupplierAuto: FC<SupplierAutoProps> = ({ supplier, view, hasImage = false, subscribeView = ESupplierSubscribeViewItem.NONE, navs, supplierRating, classNameSmallSupplier, classNameSupplier, classNameName, imageSizes }) => {
    const props = { supplier, supplierRating, className: classNameSmallSupplier }
    const propsLarge = { ...props, hasImage, subscribeView, navs, className: classNameSupplier, classNameName, imageSizes }

    if (view === ESupplierView.SMALL)
        return <SupplierSmall {...props} />
    if (view === ESupplierView.LARGE_GRAY)
        return <BaseSupplier {...propsLarge} isGray={true} />
    if (view === ESupplierView.LARGE_WHITE)
        return <BaseSupplier {...propsLarge} isGray={false} />
    if (view === ESupplierView.LARGE_WHITE_FOR_DESCRIPTION_PAGE)
        return <BaseSupplier {...propsLarge} isForDescPage={true} />
    return <></>
}
