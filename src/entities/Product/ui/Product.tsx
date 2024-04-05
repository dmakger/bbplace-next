import { FC } from "react"
import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../model/view.product.model";
import { ProductH } from "./Horizontal";
import { ProductV } from "./Vertical";
import { IProductProps } from "../model/props.product.model";

interface ProductProps extends IProductProps{
    view?: EViewProduct
}

export const Product:FC<ProductProps> = ({view=DEFAULT_VIEW_PRODUCT, ...rest}) => {
    if (view === EViewProduct.HORIZONTAL)
        return <ProductH {...rest} />
    return <ProductV {...rest} />
}
