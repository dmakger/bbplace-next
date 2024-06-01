import { FC } from "react"

import { FavouriteToProductButton } from "../logic/FavouriteToProductButton";
import { IProduct } from "@/entities/Product/model/product.model";
import { ButtonFavouriteProps } from "@/shared/ui/Button/Favourite/ButtonFavourite";

interface FavouriteSmallToProductButtonProps extends ButtonFavouriteProps {
    productId: IProduct['id']
}

export const FavouriteSmallToProductButton:FC<FavouriteSmallToProductButtonProps> = ({...props}) => {
    return (
        <FavouriteToProductButton {...props}/>
    )
}
