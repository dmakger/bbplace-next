import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductAutoList.module.scss'
import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { ProductHList } from "../../Horizontal/ui/list/ProductHList";
import { ProductVList } from "../../Vertical/ui/list/ProductVList";
import { ProductASCList } from "../../AtSupplierCard";

interface ProductAutoListProps{
    products: IProduct[],
    supplierId?: string,
    view?: EViewProduct
    className?: string,
}

export const ProductAutoList:FC<ProductAutoListProps> = ({products, supplierId, view, className}) => {
    if (view === EViewProduct.HORIZONTAL)
        return <ProductHList products={products} />
    if(view === EViewProduct.AT_SUPPLIER_CARD)
        return <ProductASCList products={products} supplierId={supplierId || ''} /> 
    return <ProductVList products={products} className={cls(cl.list, className)} />

}
