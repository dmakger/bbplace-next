import { FC } from "react"

import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { ButtonFavourite, ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { ETenderType, IBaseTender } from "@/entities/Tender/model/tender.model";
import { tenderTypeToEn } from "@/entities/Tender/lib/tender.lib";

interface FavouriteToTenderButtonProps extends ButtonFavouriteProps {
    tenderId: IBaseTender['id']
    tenderType: string
}

export const FavouriteToTenderButton:FC<FavouriteToTenderButtonProps> = ({tenderId, tenderType, ...props}) => {
    return (
        <ButtonFavourite {...props} body={{objectId: tenderId, objectType: tenderType === tenderTypeToEn(ETenderType.SALE) ? FavouriteType.TenderSale : FavouriteType.TenderPurchase}} />
    )
}
