import { IIcon } from '../model/icon.model'

import BuyerSecondaryIcon from '@/shared/assets/img/Buyer/BuyerSecondaryIcon.svg'
import BuyerWhiteIcon from '@/shared/assets/img/Buyer/BuyerWhiteIcon.svg'

import BuyerCaptionIcon from '@/shared/assets/img/Buyer/BuyerCaptionIcon.svg'

export const BUYER_ICON: IIcon = {
    default: BuyerSecondaryIcon,
    defaultHovered: BuyerWhiteIcon,
    defaultPressed: BuyerWhiteIcon
}

export const BUYER_DEFAULT_ICON: IIcon = {
    default: BuyerCaptionIcon
}