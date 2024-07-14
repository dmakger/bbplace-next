import { IIcon } from "../model/model";
import CheckboxSecondaryDefault from '@/shared/assets/img/Checkbox/CheckboxSecondaryIcon.svg'
import CheckboxSecondaryHovered from '@/shared/assets/img/Checkbox/CheckboxSecondaryHovered.svg';
import CheckboxSecondaryPressed from '@/shared/assets/img/Checkbox/CheckboxSecondaryPressed.svg'
import CheckboxSecondaryActive from '@/shared/assets/img/Checkbox/CheckboxSecondaryActive.svg'

import CheckboxTertiaryDefault from '@/shared/assets/img/Checkbox/CheckboxTertiaryIcon.svg'
import CheckboxTertiaryHovered from '@/shared/assets/img/Checkbox/CheckboxTertiaryHovered.svg';
import CheckboxTertiaryPressed from '@/shared/assets/img/Checkbox/CheckboxTertiaryPressed.svg'
import CheckboxTertiaryActive from '@/shared/assets/img/Checkbox/CheckboxTertiaryActive.svg'


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

//TERTIARY
export const CHECKBOX_TERTIARY_DEFAULT_ICON: IIcon = {
    default: CheckboxTertiaryDefault,
}

export const CHECKBOX_TERTIARY_HOVERED_ICON: IIcon = {
    default: CheckboxTertiaryHovered,
}

export const CHECKBOX_TERTIARY_PRESSED_ICON: IIcon = {
    default: CheckboxTertiaryPressed,
}

export const CHECKBOX_TERTIARY_ACTIVE_ICON: IIcon = {
    default: CheckboxTertiaryActive,
}


export const CHECKBOX_TERTIARY_ICON: IIcon = {
    default: CHECKBOX_TERTIARY_DEFAULT_ICON.default,
    defaultHovered: CHECKBOX_TERTIARY_HOVERED_ICON.default,
    defaultPressed: CHECKBOX_TERTIARY_PRESSED_ICON.default,
    active: CHECKBOX_TERTIARY_ACTIVE_ICON.default,
}