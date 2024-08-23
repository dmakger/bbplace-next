import { IIcon } from "../model/icon.model";

import ArrowDefaultIcon from '@/shared/assets/img/Arrow/ArrowDefaultIcon.svg'
import ArrowWOBlackIcon from '@/shared/assets/img/Arrow/ArrowWOBlackIcon.svg'
import ArrowWOGrayIcon from '@/shared/assets/img/Arrow/ArrowWOGrayIcon.svg'

import ArrowWOSecondaryIcon from '@/shared/assets/img/Arrow/ArrowWOSecondaryIcon.svg'
import ArrowWOSecondaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWOSecondaryHoveredIcon.svg'

import ArrowWOTertiaryIcon from '@/shared/assets/img/Arrow/ArrowWOLineTertiaryIcon.svg'
import ArrowWOTertiaryDisabledIcon from '@/shared/assets/img/Arrow/ArrowWOLineTertiaryDisabledIcon.svg'
import ArrowWOTertiaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWOLineTertiaryHovered.svg'
import ArrowWOTertiaryPressedIcon from '@/shared/assets/img/Arrow/ArrowWOLineTertiaryPressed.svg'


import ArrowWLineBlack10Icon from '@/shared/assets/img/Arrow/ArrowWLineBlack10Icon.svg'


import ArrowWLineSecondaryIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondary.svg'
import ArrowWLineSecondaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWLineSecondaryHovered.svg'

import ArrowWLineDefaultBlackIcon from '@/shared/assets/img/Arrow/ArrowWLineDefaultBlackIcon.svg'

import ArrowWLineTertiaryIcon from '@/shared/assets/img/Arrow/ArrowWLineTertiary.svg'
import ArrowWLineOnTertiaryIcon from '@/shared/assets/img/Arrow/ArrowWLineOnTertiary.svg'
import ArrowWLineTertiaryHoveredIcon from '@/shared/assets/img/Arrow/ArrowWLineTertiaryHovered.svg'
import ArrowWLineTertiaryPressedIcon from '@/shared/assets/img/Arrow/ArrowWLineTertiaryPressed.svg'
import ArrowWLineTertiaryActiveIcon from '@/shared/assets/img/Arrow/ArrowWLineTertiaryActive.svg'

import ArrowInCircleIcon from '@/shared/assets/img/Arrow/ArrowInCircleIcon.svg'
import ArrowInCirclePressed from '@/shared/assets/img/Arrow/ArrowInCirclePressed.svg'



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

export const ARROW_TERTIARY_WO_ICON: IIcon = {
    default: ArrowWOTertiaryIcon,
    disabled: ArrowWOTertiaryDisabledIcon
}

export const ARROW_TERTIARY_WO_FULL_ICON: IIcon = {
    default: ArrowWOTertiaryIcon,
    defaultHovered: ArrowWOTertiaryHoveredIcon,
    defaultPressed: ArrowWOTertiaryPressedIcon,
    active: ArrowWOTertiaryPressedIcon
} 

// ======{ WITH LINE }======

export const ARROW_WLINE_DEFAULT_BLACK_ICON: IIcon = {
    default: ArrowWLineDefaultBlackIcon
}

export const ARROW_WLINE_TERTIARY_DEFAULT_ICON: IIcon = {
    default: ArrowWLineTertiaryIcon
}

export const ARROW_WLINE_SECONDARY_ICON: IIcon = {
    default: ArrowWLineSecondaryIcon,
    defaultHovered: ArrowWLineSecondaryHoveredIcon,
    defaultPressed: ArrowWLineSecondaryHoveredIcon,
}

export const ARROW_WLINE_TERTIARY_ICON: IIcon = {
    default: ARROW_WLINE_TERTIARY_DEFAULT_ICON.default,
    defaultHovered: ArrowWLineOnTertiaryIcon,
    defaultPressed: ArrowWLineOnTertiaryIcon,

    active: ArrowWLineTertiaryActiveIcon,
}

export const ARROW_WLINE_TERTIARY_GRAY_ICON: IIcon = {
    default: ArrowWLineTertiaryIcon,
    defaultHovered: ArrowWLineTertiaryHoveredIcon,
    defaultPressed: ArrowWLineTertiaryPressedIcon,
    disabled: ArrowWLineBlack10Icon
}


export const ARROW_WLINE_TERTIARY_MOBILE_ICON: IIcon = {
    default: ARROW_WLINE_TERTIARY_DEFAULT_ICON.default
}

// ======{ INSIDE CIRCLE }======

export const ARROW_IN_CIRCLE:IIcon = {
    default: ArrowInCircleIcon,
    defaultPressed: ArrowInCirclePressed
}

