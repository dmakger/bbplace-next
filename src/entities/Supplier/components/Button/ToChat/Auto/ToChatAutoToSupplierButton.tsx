import { FC } from "react"
import { ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { ToChatSmallToSupplierButton } from "../Small/ToChatSmallToSupplierButton";
import { ToChatLargeToSupplierButton } from "../Large/ToChatLargeToSupplierButton";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";

interface ToChatAutoToSupplierButtonProps{
    supplierId: ISupplier['id']
    view?: ESupplierToChatViewItem
    isSubscribed?: boolean
    className?: string,
}

export const ToChatAutoToSupplierButton:FC<ToChatAutoToSupplierButtonProps> = ({supplierId, view=ESupplierToChatViewItem.NONE, isSubscribed, className}) => {
    const props = {supplierId, isSubscribed, className}    

    if (view === ESupplierToChatViewItem.SMALL)
        return <ToChatSmallToSupplierButton {...props} />
    if (view === ESupplierToChatViewItem.SMALL_WIDE)
        return <ToChatSmallToSupplierButton isWide={true} {...props} />
    if (view === ESupplierToChatViewItem.LARGE)
        return <ToChatLargeToSupplierButton {...props}/>
    if (view === ESupplierToChatViewItem.LARGE_WIDE)
        return <ToChatLargeToSupplierButton isWide={true} {...props}/>

    return <></>
}
