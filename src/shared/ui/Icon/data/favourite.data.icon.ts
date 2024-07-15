import { IIcon } from "../model/icon.model";

import FavouriteGrayOutline from '@/shared/assets/img/Favourite/FavouriteGrayOutline.svg'
import FavouriteBlackOutline from '@/shared/assets/img/Favourite/FavouriteBlackOutline.svg'
import FavouriteRedFill from '@/shared/assets/img/Favourite/FavouriteRedFill.svg'

import FavouriteSecondary from '@/shared/assets/img/Favourite/FavouriteSecondary.svg'
import FavouriteSecondaryHovered from '@/shared/assets/img/Favourite/FavouriteSecondaryHovered.svg'
import FavouriteSecondaryPressed from '@/shared/assets/img/Favourite/FavouriteSecondaryPressed.svg'

import FavouritePrimary from '@/shared/assets/img/Favourite/FavouritePrimary.svg'
import FavouritePrimaryHovered from '@/shared/assets/img/Favourite/FavouritePrimaryHovered.svg'
import FavouritePrimaryPressed from '@/shared/assets/img/Favourite/FavouritePrimaryPressed.svg'



export const FAVOURITE_ICON: IIcon = {
    default: FavouriteGrayOutline,
    defaultHovered: FavouriteBlackOutline,

    active: FavouriteRedFill,
}

export const FAVOURITE_NEW_ICON: IIcon = {
    default: FavouriteSecondary,
    defaultHovered: FavouriteSecondaryHovered,
    defaultPressed: FavouriteSecondaryPressed,

    active: FavouritePrimary,
    activeHovered: FavouritePrimaryHovered,
    activePressed: FavouritePrimaryPressed,
}
