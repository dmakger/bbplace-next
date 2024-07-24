import LogoDefaultIcon from '@/shared/assets/img/Logo/LogoDefaultIcon.svg'
import LogoHoveredIcon from '@/shared/assets/img/Logo/LogoHoveredIcon.svg'
import LogoPressedIcon from '@/shared/assets/img/Logo/LogoPressedIcon.svg'
import { IIcon } from '../model/icon.model'


export const LOGO_ICON: IIcon = {
    default: LogoDefaultIcon,
    defaultHovered: LogoHoveredIcon,
    defaultPressed: LogoPressedIcon,
    active: LogoDefaultIcon
}