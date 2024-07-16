import { IIcon } from "../model/model";

import SupportDefaultIcon from '@/shared/assets/img/Support/SupportDefaultIcon.svg'
import SupportHoveredIcon from '@/shared/assets/img/Support/SupportHoveredIcon.svg'
import SupportActiveIcon from '@/shared/assets/img/Support/SupportActiveIcon.svg'


export const SUPPORT_DEFAULT_ICON:IIcon = {
    default: SupportDefaultIcon
}

export const SUPPORT_ACTIVE_ICON: IIcon = {
    default: SupportActiveIcon
}

export const SUPPORT_ICON: IIcon = {
    default: SUPPORT_DEFAULT_ICON.default,
    defaultHovered: SupportHoveredIcon,
    active: SUPPORT_ACTIVE_ICON.default
}

export const SUPPORT_MENU_ICON: IIcon = {
    default: SUPPORT_DEFAULT_ICON.default,
    active: SUPPORT_ACTIVE_ICON.default
}


