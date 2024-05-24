import { FC } from "react"
import { ETenderFavouriteViewItem } from "@/entities/Tender/data/view.product.data";
import { IBaseTender } from "@/entities/Tender/model/tender.model";
import { FavouriteSmallToTenderButton } from "../Small/FavouriteSmallToTenderButton";


interface FavouriteAutoToTenderButtonProps{
    tenderId: IBaseTender['id']
    view?: ETenderFavouriteViewItem
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToTenderButton:FC<FavouriteAutoToTenderButtonProps> = ({ tenderId, view=ETenderFavouriteViewItem.NONE, isSubscribed, className}) => {
    const props = {tenderId, isSubscribed, className}

    if (view === ETenderFavouriteViewItem.SMALL)
        return <FavouriteSmallToTenderButton isFill={false} {...props}/>
    if (view === ETenderFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToTenderButton isFill={true} {...props}/>

    return <></>
}
