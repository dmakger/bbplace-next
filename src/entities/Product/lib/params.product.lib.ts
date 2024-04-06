import { EViewProductParams } from "../data/params.product.data";
import { EViewProduct } from "../model/view.product.model";

// PRODUCT
export const getViewProductByParam = (param?: EViewProductParams | null) => {
    if (EViewProductParams.VERTICAL === param)
        return EViewProduct.VERTICAL
    return EViewProduct.HORIZONTAL
}