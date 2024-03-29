import { FC } from "react"
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { SubscribeSmallToSupplierButton } from "../Small/SubscribeSmallToSupplierButton";
import { SubscribeLargeToSupplierButton } from "../Large/SubscribeLargeToSupplierButton";

interface SubscribeAutoToSupplierButtonProps{
    view?: ESupplierSubscribeViewItem
    isSubscribed?: boolean
    className?: string,
}

export const SubscribeAutoToSupplierButton:FC<SubscribeAutoToSupplierButtonProps> = ({view=ESupplierSubscribeViewItem.NONE, isSubscribed, className}) => {
    const props = {isSubscribed, className}

    if (view === ESupplierSubscribeViewItem.SMALL)
        return <SubscribeSmallToSupplierButton isWide={false} {...props}/>
    if (view === ESupplierSubscribeViewItem.SMALL_WIDE)
        return <SubscribeSmallToSupplierButton isWide={true} {...props}/>
    if (view === ESupplierSubscribeViewItem.LARGE)
        return <SubscribeLargeToSupplierButton isOutline={false} {...props}/>
    if (view === ESupplierSubscribeViewItem.LARGE_OUTLINE)
        return <SubscribeLargeToSupplierButton isOutline={true} {...props}/>
    return <></>
}
