import { FC } from "react"

import { ButtonFavourite } from "@/shared/ui/Button/Favourite/ButtonFavourite";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";

interface FavouriteSmallToSupplierButtonProps{
    supplierId?: ISupplier['id']
    isFavourited?: boolean
    isFill?: boolean
    className?: string
    classNameIcon?: string
}

export const FavouriteSmallToSupplierButton:FC<FavouriteSmallToSupplierButtonProps> = ({supplierId, isFavourited, isFill, className, classNameIcon}) => {
    const handleOnFavouriteClick = () => {}
    
    return (
        <ButtonFavourite isFavourited={isFavourited} 
                         isFill={isFill} 
                         onClick={handleOnFavouriteClick} 
                         className={className} classNameIcon={classNameIcon}/>
    )
}
