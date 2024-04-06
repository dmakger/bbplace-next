import { IIcon } from "../model/model";

import GalleryGrayOutlineIcon from '@/shared/assets/img/View/Gallery/GalleryGrayOutline.svg'
import GalleryBlackOutline from '@/shared/assets/img/View/Gallery/GalleryBlackOutline.svg'
import GalleryRedOutline from '@/shared/assets/img/View/Gallery/GalleryRedOutline.svg'


export const GALLERY_VIEW_ICON: IIcon = {
    default: GalleryGrayOutlineIcon,
    defaultHovered: GalleryRedOutline,
    active: GalleryBlackOutline,
}