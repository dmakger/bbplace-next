import { IIcon } from "../model/icon.model";

import TrashNegative from '@/shared/assets/img/Trash/TrashNegative.svg'
import TrashWhite from '@/shared/assets/img/Trash/TrashWhite.svg'
import TrashOpenWhite from '@/shared/assets/img/Trash/TrashOpenWhite.svg'

export const TRASH_NEGATIVE_TO_WHITE_ICON: IIcon = {
    default: TrashNegative,
    defaultHovered: TrashWhite,
    defaultPressed: TrashOpenWhite,
}
