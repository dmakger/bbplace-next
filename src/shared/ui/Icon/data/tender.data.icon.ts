import { IIcon } from '../model/icon.model'

import TenderZero from '@/shared/assets/img/Tender/TenderZero.svg'

import TenderPlusSecondaryIcon from '@/shared/assets/img/Tender/TenderPlusSecondaryIcon.svg'
import TenderPlusWhiteIcon from '@/shared/assets/img/Tender/TenderPlusWhiteIcon.svg'


export const TENDER_ZERO__ICON: IIcon = {
    default: TenderZero,
}

export const TENDER_PLUS_SECONDARY_ICON: IIcon = {
    default: TenderPlusSecondaryIcon,
    defaultHovered: TenderPlusWhiteIcon,
    defaultPressed: TenderPlusWhiteIcon
}
