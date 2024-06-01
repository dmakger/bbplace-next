import { FC } from "react"

import { IBaseTender } from "@/entities/Tender/model/tender.model";
import { FavouriteToTenderButton } from "../logic/FavouriteToTenderButton";
import { ButtonFavouriteProps } from "@/shared/ui/Button/Favourite/ButtonFavourite";

interface FavouriteSmallToTenderButtonProps extends ButtonFavouriteProps {
    tenderId: IBaseTender['id']
}

export const FavouriteSmallToTenderButton:FC<FavouriteSmallToTenderButtonProps> = ({...props}) => {
    return (
        <FavouriteToTenderButton {...props}/>
    )
}
