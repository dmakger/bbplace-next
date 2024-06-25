import { IIcon } from "../model/model";

import TrashDefaultIcon from '@/shared/assets/img/Trash/TrashDefaultIcon.svg'
import TrashHoveredIcon from '@/shared/assets/img/Trash/TrashHoveredIcon.svg'
import TrashPressedIcon from '@/shared/assets/img/Trash/TrashPressedIcon.svg'

import TrashNegative from '@/shared/assets/img/Trash/TrashNegative.svg'
import TrashWhite from '@/shared/assets/img/Trash/TrashWhite.svg'
import TrashOpenWhite from '@/shared/assets/img/Trash/TrashOpenWhite.svg'


export const TRASH_ICON: IIcon = {
    default: TrashDefaultIcon,
    defaultHovered: TrashHoveredIcon,
    defaultPressed: TrashPressedIcon,
}


export const TRASH_NEGATIVE_TO_WHITE_ICON: IIcon = {
    default: TrashNegative,
    defaultHovered: TrashWhite,
    defaultPressed: TrashOpenWhite,
}
