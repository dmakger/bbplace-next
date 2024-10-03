import { IIcon } from '../model/icon.model'

import ProductZero from '@/shared/assets/img/Product/ProductZero.svg'

import ProductPlusSecondary from '@/shared/assets/img/Product/ProductPlusSecondaryIcon.svg'
import ProductPlusWhite from '@/shared/assets/img/Product/ProductPlusWhiteIcon.svg'

export const PRODUCT_ZERO__ICON: IIcon = {
    default: ProductZero,
}

export const PRODUCT_PLUS_SECONDARY_ICON: IIcon = {
    default: ProductPlusSecondary,
    defaultHovered: ProductPlusWhite,
    defaultPressed: ProductPlusWhite
}
