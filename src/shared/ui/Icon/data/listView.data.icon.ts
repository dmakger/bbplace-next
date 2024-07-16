import { IIcon } from "../model/icon.model";

import ListGrayOutlineIcon from '@/shared/assets/img/View/List/ListGrayOutline.svg'
import ListBlackOutlineIcon from '@/shared/assets/img/View/List/ListBlackOutline.svg'
import ListRedOutlineIcon from '@/shared/assets/img/View/List/ListRedOutline.svg'


export const LIST_VIEW_ICON: IIcon = {
    default: ListGrayOutlineIcon,
    defaultHovered: ListRedOutlineIcon,
    active: ListBlackOutlineIcon,
}