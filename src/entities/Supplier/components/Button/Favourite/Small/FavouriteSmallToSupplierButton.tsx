import { FC } from "react"

import { IProduct } from "@/entities/Product/model/product.model";
import { ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { FavouriteToSupplierButton } from "../logic/FavouriteToSupplierButton";

interface IFavouriteSmallTosupplierButton extends ButtonFavouriteProps {
    supplierId: ISupplier['id']
}

export const FavouriteSmallToSupplierButton = ({
    ...props
}: IFavouriteSmallTosupplierButton) => {
    return (
        <FavouriteToSupplierButton {...props}/>
    )
}
