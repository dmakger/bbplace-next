import { IIcon } from '../model/icon.model'

import ChatDefaultIcon from '@/shared/assets/img/Chat/ChatIcon.svg' 
import ChatLKIcon from '@/shared/assets/img/Chat/ChatLKIcon.svg'
import ChatLKHoveredIcon from '@/shared/assets/img/Chat/ChatLKHoveredIcon.svg'
import ChatLKActiveIcon from '@/shared/assets/img/Chat/ChatLKActiveIcon.svg'
import ChatLKPressedIcon from '@/shared/assets/img/Chat/ChatLKPressedIcon.svg'

import ChatZero from '@/shared/assets/img/Chat/ChatZero.svg'
import ChatQuestion from '@/shared/assets/img/Chat/ChatQuestion.svg'


export const CHAT_ICON: IIcon = {
    default: ChatDefaultIcon
}

export const CHAT_LK_ICON: IIcon = {
    default: ChatLKIcon,
    defaultPressed: ChatLKPressedIcon,
    active: ChatLKActiveIcon
}

export const CHAT_HEADER_ICON: IIcon = {
    default: ChatLKIcon,
    defaultHovered: ChatLKHoveredIcon
}


export const CHAT_ZERO__ICON: IIcon = {
    default: ChatZero,
}

export const CHAT_QUESTION__ICON: IIcon = {
    default: ChatQuestion,
}