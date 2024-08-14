import { FC } from "react"

import { IBaseTender } from "@/entities/Tender/model/tender.model";
import { FavouriteToTenderButton } from "../logic/FavouriteToTenderButton";
import { ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";

interface FavouriteSmallToTenderButtonProps extends ButtonFavouriteProps {
    tenderId: IBaseTender['id'],
    tenderType: string
}

export const FavouriteSmallToTenderButton:FC<FavouriteSmallToTenderButtonProps> = ({...props}) => {
    return (
        <FavouriteToTenderButton {...props}/>
    )
}
