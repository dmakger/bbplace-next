import { FC } from "react"

import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { ButtonFavourite, ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { IProduct } from "@/entities/Product/model/product.model";

interface FavouriteToProductButtonProps extends ButtonFavouriteProps {
    productId: IProduct['id']
}

export const FavouriteToProductButton:FC<FavouriteToProductButtonProps> = ({productId, ...props}) => {
    return (
        <ButtonFavourite {...props} body={{objectId: productId, objectType: FavouriteType.Product}} />
    )
}
