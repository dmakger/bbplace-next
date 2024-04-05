import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductVList.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { Product } from "../../../Product";
import { EViewProduct } from "@/entities/Product/model/view.product.model";

interface ProductVListProps{
    products: IProduct[]
    className?: string,
}

export const ProductVList:FC<ProductVListProps> = ({products, className}) => {
    return (
        <div className={cls(cl.list, className)}>
            {products.map((product, index) => (
                <Product product={product} view={EViewProduct.VERTICAL} className={cl.product} key={product.id} />
            ))}
        </div>
    )
}
