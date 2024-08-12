import { IIcon } from "../model/icon.model";
import Xmark from '@/shared/assets/img/Xmark/XmarkIcon.svg'
import XmarkHovered from '@/shared/assets/img/Xmark/XmarkIconHovered.svg'

import XmarkTertiaryIcon from '@/shared/assets/img/Xmark/XmarkTertiaryIcon.svg'
import XmarkTertiaryPressedIcon from '@/shared/assets/img/Xmark/XmarkTertiaryPressed.svg'
import XmarkActiveIcon from '@/shared/assets/img/Xmark/XmarkActiveIcon.svg'


export const XMARK_DEFAULT_ICON: IIcon = {
    default: Xmark,
}

export const XMARK_HOVERED_ICON: IIcon = {
    default: XmarkHovered,
}

export const XMARK_ICON: IIcon = {
    default: XMARK_DEFAULT_ICON.default,
    defaultHovered: XMARK_HOVERED_ICON.default
}

export const MARK_MENU_ITEM_ICON: IIcon = {
    default: XmarkTertiaryIcon,
    defaultPressed: XmarkTertiaryPressedIcon,
    active: XmarkActiveIcon
}