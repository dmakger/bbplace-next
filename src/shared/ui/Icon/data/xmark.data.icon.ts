import { IIcon } from "../model/model";
import Xmark from '@/shared/assets/img/Xmark/XmarkIcon.svg'
import XmarkHovered from '@/shared/assets/img/Xmark/XmarkIconHovered.svg'


export const XMARK_DEFAULT_ICON: IIcon = {
    default: Xmark,
}

export const XMARK_HOVERED_ICON: IIcon = {
    default: XmarkHovered,
}

export const XMARK_ICON: IIcon = {
    default: XMARK_DEFAULT_ICON.default,
    defaultHovered: XMARK_HOVERED_ICON.default
}