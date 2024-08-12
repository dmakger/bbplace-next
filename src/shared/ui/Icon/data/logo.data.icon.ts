import LogoDefaultIcon from '@/shared/assets/img/Logo/LogoDefaultIcon.svg'
import LogoHoveredIcon from '@/shared/assets/img/Logo/LogoHoveredIcon.svg'
import LogoPressedIcon from '@/shared/assets/img/Logo/LogoPressedIcon.svg'

import LogoInclinedIcon from '@/shared/assets/img/Logo/LogoInclinedIcon.svg'
import LogoInclinedHoveredIcon from '@/shared/assets/img/Logo/LogoInclinedHoveredIcon.svg'
import LogoInclinedPressedIcon from '@/shared/assets/img/Logo/LogoInclinedPressedIcon.svg'
import LogoInclinedActiveIcon from '@/shared/assets/img/Logo/LogoInclinedIcon.svg'
import { IIcon } from '../model/icon.model'


export const LOGO_ICON: IIcon = {
    default: LogoDefaultIcon,
    defaultHovered: LogoHoveredIcon,
    defaultPressed: LogoPressedIcon,
    active: LogoDefaultIcon
}

export const LOGO_INCLINED_ICON: IIcon = {
    default: LogoInclinedIcon,
    defaultHovered: LogoInclinedHoveredIcon,
    defaultPressed: LogoInclinedPressedIcon,
    active: LogoInclinedActiveIcon
}