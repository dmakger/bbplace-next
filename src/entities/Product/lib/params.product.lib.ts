import { PRODUCT_PARAMS } from "@/config/params/product.params.config";
import { EViewProduct } from "../model/view.product.model";

// PRODUCT
export const getViewProductByParam = (param?: string) => {
    if (PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE === param)
        return EViewProduct.HORIZONTAL
    return EViewProduct.VERTICAL
}