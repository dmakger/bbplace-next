import { IIcon } from "../model/model";

import ArrowDefaultIcon from '@/shared/assets/img/Arrow/ArrowDefaultIcon.svg'
import ArrowWOBlackIcon from '@/shared/assets/img/Arrow/ArrowWOBlackIcon.svg'
import ArrowWOGrayIcon from '@/shared/assets/img/Arrow/ArrowWOGrayIcon.svg'

import ArrowWOSecondaryIcon from '@/shared/assets/img/Arrow/ArrowWOSecondaryIcon.svg'
import ArrowWOSecondaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWOSecondaryHoveredIcon.svg'

import ArrowWLineSecondaryIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondary.svg'
import ArrowWLineSecondaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondaryHovered.svg'


export const ARROW_ICON: IIcon = {
    default: ArrowDefaultIcon,
}

export const ARROW_WO_ICON: IIcon = {
    default: ArrowWOBlackIcon,
}

export const ARROW_GRAY_WO_ICON: IIcon = {
    default: ArrowWOGrayIcon,
}

export const ARROW_SECONDARY_WO_ICON: IIcon = {
    default: ArrowWOSecondaryIcon,
    defaultHovered: ArrowWOSecondaryHoveredIcon,
    defaultPressed: ArrowWOSecondaryHoveredIcon
}

// ======{ WITH LINE }======
export const ARROW_WLINE_SECONDARY_ICON: IIcon = {
    default: ArrowWLineSecondaryIcon,
    defaultHovered: ArrowWLineSecondaryHoveredIcon,
    defaultPressed: ArrowWLineSecondaryHoveredIcon,
}