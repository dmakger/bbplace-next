import { IIcon } from '../model/icon.model'

import CheckMarkDark from '@/shared/assets/img/CheckMark/CheckMarkDark.svg'

import CheckMarkTertiaryIcon from '@/shared/assets/img/CheckMark/CheckMarkTertiaryIcon.svg'
import CheckMarkTertiaryHoveredIcon from '@/shared/assets/img/CheckMark/CheckMarkTertiaryHovered.svg'


export const CHECK_MARK__DARK__ICON: IIcon = {
    default: CheckMarkDark
}

export const CHECK_MARK_TERTIARY_ICON:IIcon = {
    default: CheckMarkTertiaryIcon,
    defaultHovered: CheckMarkTertiaryHoveredIcon,
    defaultPressed: CheckMarkTertiaryHoveredIcon
}