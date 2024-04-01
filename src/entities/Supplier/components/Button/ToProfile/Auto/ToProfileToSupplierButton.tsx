import { FC } from "react"
import { ESupplierToProfileViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { ToProfileSmallToSupplierButton } from "../Small/ToProfileSmallToSupplierButton";
import { ToProfileLargeToSupplierButton } from "../Large/ToProfileLargeToSupplierButton";

interface ToProfileAutoToSupplierButtonProps{
    supplierId: ISupplier['id']
    view?: ESupplierToProfileViewItem
    isSubscribed?: boolean
    className?: string,
}

export const ToProfileAutoToSupplierButton:FC<ToProfileAutoToSupplierButtonProps> = ({ supplierId, view=ESupplierToProfileViewItem.NONE, isSubscribed, className}) => {
    const props = {supplierId, isSubscribed, className}

    if (view === ESupplierToProfileViewItem.SMALL)
        return <ToProfileSmallToSupplierButton {...props}/>
    if (view === ESupplierToProfileViewItem.LARGE)
        return <ToProfileLargeToSupplierButton {...props}/>

    return <></>
}
