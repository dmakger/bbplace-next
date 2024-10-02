import { IIcon } from "../model/icon.model";
import AtSignDefaultIcon from '@/shared/assets/img/AtSign/AtSignDefaultIcon.svg'
import AtSignHoveredIcon from '@/shared/assets/img/AtSign/AtSignHoveredIcon.svg'
import AtSignDisabledIcon from '@/shared/assets/img/AtSign/AtSignDisabledIcon.svg'

import AtSignCaptionIcon from '@/shared/assets/img/AtSign/AtSignCaptionIcon.svg'

export const AT_SIGN_ICON: IIcon = {
    default: AtSignDefaultIcon,
    defaultHovered: AtSignHoveredIcon,
    defaultPressed: AtSignHoveredIcon,
    disabled: AtSignDisabledIcon
}

export const AT_SIGN_CAPTION_ICON: IIcon = {
    default: AtSignCaptionIcon
}