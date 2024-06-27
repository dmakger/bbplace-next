import { IIcon } from "../model/model";
import GearDefaultIcon from '@/shared/assets/img/Gear/GearDefaultIcon.svg'
import GearHoveredIcon from '@/shared/assets/img/Gear/GearHoveredIcon.svg'
import GearPressedIcon from '@/shared/assets/img/Gear/GearPressedIcon.svg'

export const GEAR_DEFAULT_ICON: IIcon = {
    default: GearDefaultIcon,
}

export const GEAR_HOVERED_ICON: IIcon = {
    default: GearHoveredIcon,
}

export const GEAR_PRESSED_ICON: IIcon = {
    default: GearPressedIcon,
}

export const GEAR_ICON: IIcon = {
    default: GEAR_DEFAULT_ICON.default,
    defaultHovered: GEAR_HOVERED_ICON.default,
    defaultPressed: GEAR_PRESSED_ICON.default
}