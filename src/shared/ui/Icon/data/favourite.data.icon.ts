import { IIcon } from "../model/model";

import FavouriteGrayOutline from '@/shared/assets/img/Favourite/FavouriteGrayOutline.svg'
import FavouriteBlackOutline from '@/shared/assets/img/Favourite/FavouriteBlackOutline.svg'
import FavouriteRedFill from '@/shared/assets/img/Favourite/FavouriteRedFill.svg'


export const FAVOURITE_ICON: IIcon = {
    default: FavouriteGrayOutline,
    defaultHovered: FavouriteBlackOutline,

    active: FavouriteRedFill,
}
