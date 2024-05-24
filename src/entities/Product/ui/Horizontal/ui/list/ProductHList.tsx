import React, { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductHList.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { Product } from "../../../Product";
import { EViewProduct } from "@/entities/Product/model/view.product.model";


interface ProductHListProps{
    products: IProduct[]
    className?: string,
}

export const ProductHList:FC<ProductHListProps> = ({products, className}) => {
    return (
        <div className={cls(cl.list, className)}>
            {products.map((product, index) => (
                <React.Fragment key={product.id}>
                    <Product product={product} view={EViewProduct.HORIZONTAL} className={cl.product} />
                    {index + 1 !== products.length && 
                        <div className={cl.line} />
                    }
                </React.Fragment>
            ))}
        </div>
    )
}
