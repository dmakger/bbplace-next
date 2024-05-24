import { FC } from "react"
import { ESupplierFavouriteViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { IProduct } from "@/entities/Product/model/product.model";
import { FavouriteSmallToProductButton } from "../Small/FavouriteSmallToSupplierButton";
import { EProductFavouriteViewItem } from "@/entities/Product/data/view.product.data";


interface FavouriteAutoToProductButtonProps{
    productId: IProduct['id']
    view?: EProductFavouriteViewItem
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToProductButton:FC<FavouriteAutoToProductButtonProps> = ({ productId, view=EProductFavouriteViewItem.NONE, isSubscribed, className}) => {
    const props = {productId, isSubscribed, className}

    if (view === EProductFavouriteViewItem.SMALL)
        return <FavouriteSmallToProductButton isFill={false} {...props}/>
    if (view === EProductFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToProductButton isFill={true} {...props}/>

    return <></>
}
