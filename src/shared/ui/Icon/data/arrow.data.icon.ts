import { IIcon } from "../model/model";

import ArrowDefaultIcon from '@/shared/assets/img/Arrow/ArrowDefaultIcon.svg'
import ArrowWOBlackIcon from '@/shared/assets/img/Arrow/ArrowWOBlackIcon.svg'
import ArrowWOGrayIcon from '@/shared/assets/img/Arrow/ArrowWOGrayIcon.svg'

import ArrowWLineSecondaryIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondary.svg'
import ArrowWLineSecondaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondaryHovered.svg'
import ArrowWLineSecondaryPressedIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondaryPressed.svg'


export const ARROW_ICON: IIcon = {
    default: ArrowDefaultIcon,
}

export const ARROW_WO_ICON: IIcon = {
    default: ArrowWOBlackIcon,
}

export const ARROW_GRAY_WO_ICON: IIcon = {
    default: ArrowWOGrayIcon,
}

// ======{ WITH LINE }======
export const ARROW_WLINE_SECONDARY_ICON: IIcon = {
    default: ArrowWLineSecondaryIcon,
    defaultHovered: ArrowWLineSecondaryHoveredIcon,
    defaultPressed: ArrowWLineSecondaryPressedIcon,
}