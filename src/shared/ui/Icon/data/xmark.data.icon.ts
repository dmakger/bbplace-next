import { IIcon } from "../model/icon.model";
import XmarkNegative from '@/shared/assets/img/Xmark/XmarkNegative.svg'
import XmarkWhite from '@/shared/assets/img/Xmark/XmarkWhite.svg'

import XmarkTertiaryIcon from '@/shared/assets/img/Xmark/XmarkTertiaryIcon.svg'
import XmarkTertiaryPressedIcon from '@/shared/assets/img/Xmark/XmarkTertiaryPressed.svg'
import XmarkActiveIcon from '@/shared/assets/img/Xmark/XmarkActiveIcon.svg'

import XmarkCaptionIcon from '@/shared/assets/img/Xmark/XmarkCaptionIcon.svg'


export const XMARK_NEGATIVE__ICON: IIcon = {
    default: XmarkNegative,
}

export const XMARK_WHITE__ICON: IIcon = {
    default: XmarkWhite,
}

export const XMARK_ICON: IIcon = {
    default: XMARK_NEGATIVE__ICON.default,
    defaultHovered: XMARK_WHITE__ICON.default
}

export const XMARK_MENU_ITEM_ICON: IIcon = {
    default: XmarkTertiaryIcon,
    defaultPressed: XmarkTertiaryPressedIcon,
    active: XmarkActiveIcon
}

export const XMARK__TERTIARY_TO_WHITE__ICON: IIcon = {
    default: XmarkTertiaryIcon,
    defaultHovered: XmarkWhite,
}

export const XMARK_CAPTION_ICON: IIcon = {
    default: XmarkCaptionIcon
}