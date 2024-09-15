import { FC } from "react"
import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../model/view.product.model";
import { ProductH } from "./Horizontal";
import { ProductV } from "./Vertical";
import { IProductProps } from "../model/props.product.model";
import { ProductASC } from "./AtSupplierCard";
import { ProductLK } from "./LKProduct";

interface ProductProps extends IProductProps{
    view?: EViewProduct
    setIsOpenModal?: Function
}

export const Product:FC<ProductProps> = ({view=DEFAULT_VIEW_PRODUCT, product, ...rest}) => {
    if (view === EViewProduct.HORIZONTAL)
        return <ProductH item={product} {...rest} />
    if(view === EViewProduct.AT_SUPPLIER_CARD)
        return <ProductASC product={product} {...rest}/>
    if(view === EViewProduct.LK_PRODUCT)
        return <ProductLK product={product} {...rest} />
    return <ProductV item={product} {...rest} />
}
