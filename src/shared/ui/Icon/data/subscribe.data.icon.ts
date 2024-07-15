import { IIcon } from "../model/icon.model";

import SubscribeDefaultGrayIcon from '@/shared/assets/img/Subscribe/SubscribeDefaultGrayIcon.svg'
import SubscribeDefaultBlueIcon from '@/shared/assets/img/Subscribe/SubscribeDefaultBlueIcon.svg'
import SubscribeActiveIcon from '@/shared/assets/img/Subscribe/SubscribeActiveIcon.svg'
import SubscribeBlueIcon from '@/shared/assets/img/Subscribe/SubscribeBlueIcon.svg'
import SubscribeActiveHoveredIcon from '@/shared/assets/img/Subscribe/SubscribeActiveHoveredIcon.svg'


export const SUBSCRIBE_GRAY_ICON: IIcon = {
    default: SubscribeDefaultGrayIcon,
    defaultHovered: SubscribeDefaultBlueIcon,

    active: SubscribeActiveIcon,
}


export const SUBSCRIBE_BLUE_ICON: IIcon = {
    default: SubscribeDefaultBlueIcon,
    defaultHovered: SubscribeBlueIcon,
    active: SubscribeActiveIcon,
    activeHovered: SubscribeActiveHoveredIcon
}

