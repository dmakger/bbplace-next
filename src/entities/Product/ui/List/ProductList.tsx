"use client"

import { FC, useEffect, useState } from "react"
import cl from './_ProductList.module.scss'

import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../../model/view.product.model";
import { ProductHList } from "../Horizontal/ui/list/ProductHList";
import { ProductVList } from "../Vertical/ui/list/ProductVList";
import { IProduct } from "../../model/product.model";
import { ProductAPI } from "../../api/product.api";
import { useAppSelector } from "@/storage/hooks";
import { productApiListToProductList } from "../../lib/product.lib";
import { PRODUCT_ARGS_REQUEST } from "../../data/product.data";
import { cls } from "@/shared/lib/classes.lib";

interface ProductListProps{
    view?: EViewProduct
    className?: string,
}

export const ProductList:FC<ProductListProps> = ({view=DEFAULT_VIEW_PRODUCT, className}) => {
     // STATE
     const [productList, setProductList] = useState<IProduct[]>([])

     // API
     const {data: productsAPI, isLoading: isProductLoading} = ProductAPI.useGetProductsQuery(PRODUCT_ARGS_REQUEST, {refetchOnMountOrArgChange: true})
 
     // RTK
     const metrics = useAppSelector(state => state.metrics);
     const currencyList = useAppSelector(state => state.currencyList);
 
     // EFFECT
     useEffect(() => {
         if (productsAPI)
             setProductList(productApiListToProductList(productsAPI, metrics, currencyList))
     }, [productsAPI])
     

     if (isProductLoading)
        return <div>Loading...</div>
    
    if (view === EViewProduct.HORIZONTAL)
        return <ProductHList products={productList} className={cls(cl.list, className)} />
    return <ProductVList className={cls(cl.list, className)} />
}