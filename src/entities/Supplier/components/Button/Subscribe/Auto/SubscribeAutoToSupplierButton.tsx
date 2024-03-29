import { FC } from "react"
import { SubscribeIcon } from "@/shared/ui/Icon";
import { ESupplierItemView } from "@/entities/Supplier/data/view.supplier.data";
import { SubscribeSmallToSupplierButton } from "../Small/SubscribeSmallToSupplierButton";
import { SubscribeLargeToSupplierButton } from "../Large/SubscribeLargeToSupplierButton";

interface SubscribeAutoToSupplierButtonProps{
    view?: ESupplierItemView
    isSubscribed?: boolean
    className?: string,
}

export const SubscribeAutoToSupplierButton:FC<SubscribeAutoToSupplierButtonProps> = ({view=ESupplierItemView.NONE, isSubscribed, className}) => {
    const props = {isSubscribed, className}

    if (view === ESupplierItemView.SMALL)
        return <SubscribeSmallToSupplierButton {...props}/>
    if (view === ESupplierItemView.LARGE)
        return <SubscribeLargeToSupplierButton {...props}/>
    return <></>
}
