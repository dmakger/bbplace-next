import { ESupplierFavouriteViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { IProduct } from "@/entities/Product/model/product.model";
import { EProductFavouriteViewItem } from "@/entities/Product/data/view.product.data";
import { ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { FavouriteSmallToSupplierButton } from "../Small/FavouriteSmallToSupplierButton";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";


interface IFavouriteAutoToSupplerButton{
    supplierId: ISupplier['id']
    view?: ESupplierFavouriteViewItem
    variantFavourite?: ButtonFavouriteProps['variantFavourite']
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToSupplierButton = (
    { view=ESupplierFavouriteViewItem.NONE,
         ...rest
}: IFavouriteAutoToSupplerButton) => {
    if (view === ESupplierFavouriteViewItem.SMALL)
        return <FavouriteSmallToSupplierButton isFill={false} {...rest}/>
    if (view === ESupplierFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToSupplierButton isFill={true} {...rest}/>

    return <></>
}
