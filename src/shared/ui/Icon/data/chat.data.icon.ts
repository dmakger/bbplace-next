import ChatDefaultIcon from '@/shared/assets/img/Chat/ChatIcon.svg' 
import { IIcon } from '../model/icon.model'
import ChatLKIcon from '@/shared/assets/img/Chat/ChatLKIcon.svg'
import ChatLKHoveredIcon from '@/shared/assets/img/Chat/ChatLKHoveredIcon.svg'
import ChatLKActiveIcon from '@/shared/assets/img/Chat/ChatLKActiveIcon.svg'


export const CHAT_ICON: IIcon = {
    default: ChatDefaultIcon
}

export const CHAT_LK_ICON: IIcon = {
    default: ChatLKIcon,
    active: ChatLKActiveIcon
}

export const CHAT_HEADER_ICON: IIcon = {
    default: ChatLKIcon,
    defaultHovered: ChatLKHoveredIcon
}