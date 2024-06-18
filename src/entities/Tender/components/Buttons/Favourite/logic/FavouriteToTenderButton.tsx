import { FC } from "react"

import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { ButtonFavourite, ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { IBaseTender } from "@/entities/Tender/model/tender.model";

interface FavouriteToTenderButtonProps extends ButtonFavouriteProps {
    tenderId: IBaseTender['id']
}

export const FavouriteToTenderButton:FC<FavouriteToTenderButtonProps> = ({tenderId, ...props}) => {
    return (
        <ButtonFavourite {...props} body={{objectId: tenderId, objectType: FavouriteType.Product}} />
    )
}
