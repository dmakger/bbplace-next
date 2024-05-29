import { FC } from "react"
import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../model/view.product.model";
import { ProductH } from "./Horizontal";
import { ProductV } from "./Vertical";
import { IProductProps } from "../model/props.product.model";
import { ProductASC } from "./AtSupplierCard";

interface ProductProps extends IProductProps{
    view?: EViewProduct
}

export const Product:FC<ProductProps> = ({view=DEFAULT_VIEW_PRODUCT, product, ...rest}) => {
    if (view === EViewProduct.HORIZONTAL)
        return <ProductH product={product} {...rest} />
    if(view === EViewProduct.AT_SUPPLIER_CARD)
        return <ProductASC slide={product} {...rest}/>
    return <ProductV product={product} {...rest} />
}
