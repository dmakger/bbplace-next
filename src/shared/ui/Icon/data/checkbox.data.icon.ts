import { IIcon } from "../model/model";
import CheckboxSecondaryDefault from '@/shared/assets/img/Checkbox/CheckboxSecondaryIcon.svg'
import CheckboxSecondaryHovered from '@/shared/assets/img/Checkbox/CheckBoxSecondaryHovered.svg'
import CheckboxSecondaryPressed from '@/shared/assets/img/Checkbox/CheckboxSecondaryPressed.svg'
import CheckboxSecondaryActive from '@/shared/assets/img/Checkbox/CheckboxSecondaryActive.svg'


//SECONDARY
export const CHECKBOX_SECONDARY_DEFAULT_ICON: IIcon = {
    default: CheckboxSecondaryDefault,
}

export const CHECKBOX_SECONDARY_HOVERED_ICON: IIcon = {
    default: CheckboxSecondaryHovered,
}

export const CHECKBOX_SECONDARY_PRESSED_ICON: IIcon = {
    default: CheckboxSecondaryPressed,
}

export const CHECKBOX_SECONDARY_ACTIVE_ICON: IIcon = {
    default: CheckboxSecondaryActive,
}


export const CHECKBOX_SECONDARY_ICON: IIcon = {
    default: CHECKBOX_SECONDARY_DEFAULT_ICON.default,
    defaultHovered: CHECKBOX_SECONDARY_HOVERED_ICON.default,
    defaultPressed: CHECKBOX_SECONDARY_PRESSED_ICON.default,
    active: CHECKBOX_SECONDARY_ACTIVE_ICON.default,
}