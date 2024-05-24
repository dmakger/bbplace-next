import { FC } from "react"

import { IBaseTender } from "@/entities/Tender/model/tender.model";
import { FavouriteToTenderButton } from "../logic/FavouriteToTenderButton";

interface FavouriteSmallToTenderButtonProps{
    tenderId: IBaseTender['id']
    isFavourited?: boolean
    isFill?: boolean
    className?: string
    classNameIcon?: string
}

export const FavouriteSmallToTenderButton:FC<FavouriteSmallToTenderButtonProps> = ({...props}) => {
    return (
        <FavouriteToTenderButton {...props}/>
    )
}
