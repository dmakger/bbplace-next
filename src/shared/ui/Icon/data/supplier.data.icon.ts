import { IIcon } from '../model/icon.model'

import SupplierZero from '@/shared/assets/img/Supplier/SupplierZero.svg'

import OnlyForSuppliersIcon from '@/shared/assets/img/Supplier/OnlyForSuppliers.svg'

import SupplierSecondaryIcon from '@/shared/assets/img/Supplier/SupplierSecondaryIcon.svg'
import SupplierWhiteIcon from '@/shared/assets/img/Supplier/SupplierWhiteIcon.svg'

import SupplierCaptionIcon from '@/shared/assets/img/Supplier/SupplierCaptionIcon.svg'


export const SUPPLIER_ZERO__ICON: IIcon = {
    default: SupplierZero,
}

export const ONLY_FOR_SUPPLIERS_ICON: IIcon = {
    default: OnlyForSuppliersIcon
}

export const SUPPLIER_ICON: IIcon = {
    default: SupplierSecondaryIcon,
    defaultHovered: SupplierWhiteIcon,
    defaultPressed: SupplierWhiteIcon
}

export const SUPPLIER_DEFAULT_ICON: IIcon = {
    default: SupplierCaptionIcon
}
