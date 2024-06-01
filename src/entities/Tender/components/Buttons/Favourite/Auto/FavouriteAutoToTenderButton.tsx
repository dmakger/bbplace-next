import { FC } from "react"
import { ETenderFavouriteViewItem } from "@/entities/Tender/data/view.product.data";
import { IBaseTender } from "@/entities/Tender/model/tender.model";
import { FavouriteSmallToTenderButton } from "../Small/FavouriteSmallToTenderButton";
import { ButtonFavouriteProps } from "@/shared/ui/Button/Favourite/ButtonFavourite";


interface FavouriteAutoToTenderButtonProps{
    tenderId: IBaseTender['id']
    view?: ETenderFavouriteViewItem
    variantFavourite?: ButtonFavouriteProps['variantFavourite']
    isSubscribed?: boolean
    className?: string,
}

export const FavouriteAutoToTenderButton:FC<FavouriteAutoToTenderButtonProps> = ({ view=ETenderFavouriteViewItem.NONE, ...rest}) => {
    if (view === ETenderFavouriteViewItem.SMALL)
        return <FavouriteSmallToTenderButton isFill={false} {...rest}/>
    if (view === ETenderFavouriteViewItem.SMALL_FILL)
        return <FavouriteSmallToTenderButton isFill={true} {...rest}/>

    return <></>
}
