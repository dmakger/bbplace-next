import { EViewProductParams } from "../data/params.product.data";
import { EViewProduct } from "../model/view.product.model";

// PRODUCT
export const getViewProductByParam = (param?: EViewProductParams | null) => {
    if (EViewProductParams.HORIZONTAL === param)
        return EViewProduct.HORIZONTAL
    return EViewProduct.VERTICAL
}