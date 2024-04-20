import { FC } from "react"
import { ESupplierFavouriteViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { FavouriteSmallToSupplierButton } from "../Small/FavouriteSmallToSupplierButton";


interface FavouriteAutoToSupplierButtonProps{
    supplierId?: ISupplier['id']
    view?: ESupplierFavouriteViewItem
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToSupplierButton:FC<FavouriteAutoToSupplierButtonProps> = ({ supplierId, view=ESupplierFavouriteViewItem.NONE, isSubscribed, className}) => {
    const props = {supplierId, isSubscribed, className}

    if (view === ESupplierFavouriteViewItem.SMALL)
        return <FavouriteSmallToSupplierButton isFill={false} {...props}/>
    if (view === ESupplierFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToSupplierButton isFill={true} {...props}/>

    return <></>
}
