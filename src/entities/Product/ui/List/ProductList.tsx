"use client"

import { FC, useEffect, useState } from "react"

import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../../model/view.product.model";
import { ProductHList } from "../Horizontal/ui/list/ProductHList";
import { ProductVList } from "../Vertical/ui/list/ProductVList";
import { IProduct } from "../../model/product.model";
import { ProductAPI } from "../../api/product.api";
import { useAppSelector } from "@/storage/hooks";
import { productApiListToProductList } from "../../lib/product.lib";
import { PRODUCT_ARGS_REQUEST } from "../../data/product.data";
import { cls } from "@/shared/lib/classes.lib";
import { useDispatch } from "react-redux";
import { PTCSlice } from "@/features/storage/PTC/ptc.storage";
import { EPTC } from "@/widgets/NavBarPTC/model/ptc.model";
import { ProductAutoList } from "./Auto/ProductAutoList";
import { WrapperPagination } from "@/shared/ui/Wrapper/Pagination/ui/WrapperPagination";
import { PRODUCT_PARAMS } from "@/config/params/product.params.config";

interface ProductListProps{
    view?: EViewProduct
    className?: string,
}

export const ProductList:FC<ProductListProps> = ({view=DEFAULT_VIEW_PRODUCT, className}) => {
     // STATE
     const [productList, setProductList] = useState<IProduct[]>([])

     // API
     const {data: productsAPI, isLoading: isProductLoading} = ProductAPI.useGetProductsQuery(PRODUCT_ARGS_REQUEST, {refetchOnMountOrArgChange: true})
     const {data: countProducts, isLoading: isCountProductsLoading} = ProductAPI.useGetCountProductsQuery({limit: PRODUCT_ARGS_REQUEST.limit}, {refetchOnMountOrArgChange: true})
     const {data: countAllProducts, isLoading: isCountAllProductsLoading} = ProductAPI.useGetCountProductsQuery({limit: 1}, {refetchOnMountOrArgChange: true})
 
     // RTK
     const dispatch = useDispatch();
     const metrics = useAppSelector(state => state.metrics);
     const currencyList = useAppSelector(state => state.currencyList);
 
     // EFFECT
     useEffect(() => {
         if (productsAPI)
             setProductList(productApiListToProductList(productsAPI, metrics, currencyList))
     }, [productsAPI])

     useEffect(() => {
        if (!isCountProductsLoading && countAllProducts !== undefined) {
            dispatch(PTCSlice.actions.setPTC({
                amount: countAllProducts,
                view: EPTC.PRODUCT,
            }), {refetchOnMountOrArgChange: true});
        }
     }, [dispatch, countProducts, isCountProductsLoading])
     

     if (isProductLoading)
        return <div>Loading...</div>
    return (
        <WrapperPagination amount={countProducts ? countProducts : 1} keyParam={PRODUCT_PARAMS.VIEW__KEY}>
            <ProductAutoList products={productList} view={view} className={className} />
        </WrapperPagination>
    )
}
