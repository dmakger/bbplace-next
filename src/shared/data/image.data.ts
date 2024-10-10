import defaultImageJPG from '@/shared/assets/img/defaultUserGray.svg'

import { PRODUCT_ZERO__ICON } from "../ui/Icon/data/product.data.icon";
import { SUPPLIER_ZERO__ICON } from "../ui/Icon/data/supplier.data.icon";
import { TENDER_ZERO__ICON } from "../ui/Icon/data/tender.data.icon";
import { IMAGE__ICON } from '../ui/Icon/data/image.data.icon';


/**
 * Варианты передаваемой картинки в `ImageAPI`
 */
export enum ImageAPIVariants {
    Default = 'default',
    Product = 'product',
    Tender = 'tender',
    Supplier = 'supplier',
}

/**
 * Дефолтные картинки для `ImageAPI` относительно `ImageAPIVariants`
 */
export const IMAGE_API__DEFAULTS = {
    [ImageAPIVariants.Default]: IMAGE__ICON.default,
    [ImageAPIVariants.Product]: PRODUCT_ZERO__ICON.default,
    [ImageAPIVariants.Tender]: TENDER_ZERO__ICON.default,
    [ImageAPIVariants.Supplier]: SUPPLIER_ZERO__ICON.default,
}