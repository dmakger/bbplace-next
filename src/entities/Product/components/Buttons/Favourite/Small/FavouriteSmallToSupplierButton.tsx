import { FC } from "react"

import { FavouriteToProductButton } from "../logic/FavouriteToProductButton";
import { IProduct } from "@/entities/Product/model/product.model";

interface FavouriteSmallToProductButtonProps{
    productId: IProduct['id']
    isFavourited?: boolean
    isFill?: boolean
    className?: string
    classNameIcon?: string
}

export const FavouriteSmallToProductButton:FC<FavouriteSmallToProductButtonProps> = ({...props}) => {
    return (
        <FavouriteToProductButton {...props}/>
    )
}
