import { FC } from "react"
import { ESupplierFavouriteViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { IProduct } from "@/entities/Product/model/product.model";
import { FavouriteSmallToProductButton } from "../Small/FavouriteSmallToSupplierButton";
import { EProductFavouriteViewItem } from "@/entities/Product/data/view.product.data";
import { ButtonFavouriteProps } from "@/shared/ui/Button/Favourite/ButtonFavourite";


interface FavouriteAutoToProductButtonProps{
    productId: IProduct['id']
    view?: EProductFavouriteViewItem
    variantFavourite?: ButtonFavouriteProps['variantFavourite']
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToProductButton:FC<FavouriteAutoToProductButtonProps> = ({ view=EProductFavouriteViewItem.NONE, ...rest}) => {
    if (view === EProductFavouriteViewItem.SMALL)
        return <FavouriteSmallToProductButton isFill={false} {...rest}/>
    if (view === EProductFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToProductButton isFill={true} {...rest}/>

    return <></>
}
