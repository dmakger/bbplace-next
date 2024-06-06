"use client"

import { FC, useEffect, useState } from "react"
import cl from './_ProductList.module.scss'

import { DEFAULT_VIEW_PRODUCT, EViewProduct } from "../../../model/view.product.model";
import { IProduct } from "../../../model/product.model";
import { ProductAPI } from "../../../api/product.api";
import { productApiListToProductList } from "../../../lib/product.lib";
import { PRODUCT_ARGS_REQUEST } from "../../../data/product.data";
import { useDispatch } from "react-redux";
import { PTCSlice } from "@/features/storage/PTC/ptc.storage";
import { EPTC } from "@/widgets/NavBarPTC/model/ptc.model";
import { ProductAutoList } from "../Auto/ProductAutoList";
import { WrapperPagination } from "@/shared/ui/Wrapper/Pagination/ui/WrapperPagination";
import { PRODUCT_PARAMS } from "@/config/params/product.params.config";
import { ECatalogVariants } from "@/widgets/SortFilterSidebar";
import { WrapperSortFilter } from "@/shared/ui/Wrapper/SortFilter/ui/WrapperSortFilter";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { useSearchParams } from "next/navigation";
import { paramsToBack } from "@/config/params/backend.params.config";
import { SuspenseL } from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { getViewProductByParam } from "@/entities/Product/lib/params.product.lib";

interface ProductListProps{
    view?: EViewProduct
    className?: string,
}

export const ProductList:FC<ProductListProps> = ({...rest}) => {
    return (
        <SuspenseL>
            <ProductListChild {...rest}/>
        </SuspenseL>
    )
}


export const ProductListChild:FC<ProductListProps> = ({view, className}) => {
    // ROUTER
    const searchParams = useSearchParams();
    const newParams = paramsToBack(searchParams)

    // STATE
    const [productList, setProductList] = useState<IProduct[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1) 
    const [viewProductList, setViewProductList] = useState<EViewProduct>(DEFAULT_VIEW_PRODUCT)    

    // API
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()          
    const {data: productsAPI, isLoading: isProductLoading} = ProductAPI.useGetProductsQuery({limit: PRODUCT_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams}, {refetchOnMountOrArgChange: true})
    const {data: countProducts, isLoading: isCountProductsLoading} = ProductAPI.useGetCountProductsQuery({limit: PRODUCT_ARGS_REQUEST.limit, params: newParams}, {refetchOnMountOrArgChange: true})
    const {data: countAllProducts, isLoading: isCountAllProductsLoading} = ProductAPI.useGetCountProductsQuery({limit: 1, params: newParams}, {refetchOnMountOrArgChange: true})  

    // RTK
    const dispatch = useDispatch();

    // EFFECT
    useEffect(() => {
        if (view !== undefined) {
            setViewProductList(view)
            return
        }

        const productView = PRODUCT_PARAMS.getView(searchParams.get(PRODUCT_PARAMS.VIEW__KEY))
        setViewProductList(getViewProductByParam(productView))
    }, [view])
    useEffect(() => {
        if (productsAPI)
            setProductList(productApiListToProductList(productsAPI, metrics, currencyList))
    }, [productsAPI, metrics, currencyList])

    useEffect(() => {
        if (!isCountAllProductsLoading && countAllProducts !== undefined) {
            dispatch(PTCSlice.actions.setPTC({
                amount: countAllProducts,
                view: EPTC.PRODUCT,
            }), {refetchOnMountOrArgChange: true});
        }
    }, [dispatch, countProducts, isCountAllProductsLoading])

    if (isProductLoading && isCountProductsLoading)
        return <div>Loading...</div>
    return (
        <WrapperSortFilter variant={ECatalogVariants.PRODUCTS}>
            <WrapperPagination amount={countProducts || 1}
                                active={pageNumber} keyPageParam={PRODUCT_PARAMS.NUMBER_PAGE__KEY} 
                                set={setPageNumber} className={cl.block}>
                <ProductAutoList products={productList} view={viewProductList} className={className} />
            </WrapperPagination>
        </WrapperSortFilter>
    )
}
