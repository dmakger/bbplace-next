"use client"

import { FC, useEffect, useState } from "react";
import cl from './_ProductList.module.scss';

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
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { getViewProductByParam } from "@/entities/Product/lib/params.product.lib";
import { isEqual } from "lodash";
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api";
import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { isAuth } from "@/entities/Auth/lib/auth-token.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { integrateFavoriteInList } from "@/entities/Favourite/lib/list.favourite.lib";
import { Loader } from "@/shared/ui/Loader";
import { WrapperDefaultProductNotFound } from "@/shared/ui/Wrapper/Default/ui/Product/NotFound/WrapperDefaultProductNotFound";

interface ProductListProps {
    view?: EViewProduct;
    className?: string;
}

export const ProductList: FC<ProductListProps> = ({ ...rest }) => {
    return (
        <SuspenseL>
            <ProductListChild {...rest} />
        </SuspenseL>
    );
};

export const ProductListChild: FC<ProductListProps> = ({ view, className }) => {
    // ROUTER
    const searchParams = useSearchParams();
    const backParams = paramsToBack(searchParams);

    // STATE
    const [prevBackParams, setPrevBackParams] = useState<Record<string, string>>({});
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [viewProductList, setViewProductList] = useState<EViewProduct>(DEFAULT_VIEW_PRODUCT);

    // API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        { limit: PRODUCT_ARGS_REQUEST.limit, page: pageNumber - 1, params: backParams },
        { refetchOnMountOrArgChange: true }
    );
    const { data: countProducts, isLoading: isCountProductsLoading } = ProductAPI.useGetCountProductsQuery(
        { limit: PRODUCT_ARGS_REQUEST.limit, params: backParams },
        { refetchOnMountOrArgChange: true }
    );
    const { data: countAllProducts, isLoading: isCountAllProductsLoading } = ProductAPI.useGetCountProductsQuery(
        { limit: 1, params: backParams },
        { refetchOnMountOrArgChange: true }
    );
    const { data: favorites } = FavouriteAPI.useAreInFavoritesQuery(
        isAuth() && productsAPI ? {objectIds: productsAPI.map(it => it.id), objectType: FavouriteType.Product} : skipToken,
        { refetchOnMountOrArgChange: true }
    )

    // RTK
    const dispatch = useDispatch();

    // EFFECT
    useEffect(() => {
        if (view !== undefined) {
            setViewProductList(view);
            return;
        }

        const productView = PRODUCT_PARAMS.getView(searchParams.get(PRODUCT_PARAMS.VIEW__KEY));
        setViewProductList(getViewProductByParam(productView));
    }, [view, searchParams]);


    useEffect(() => {
        if (productsAPI === undefined)
            return 
        const newProducts = productApiListToProductList(productsAPI, metrics, currencyList)
        setProductList(integrateFavoriteInList<IProduct>(newProducts, favorites))
    }, [favorites, productsAPI, metrics, currencyList]);

    useEffect(() => {
        if (!isEqual(backParams, prevBackParams)) {
            setPrevBackParams(backParams)
        }
    }, [backParams])

    useEffect(() => {
        if (!isCountAllProductsLoading && countAllProducts !== undefined) {
            dispatch(
                PTCSlice.actions.setPTC({
                    amount: countAllProducts,
                    view: EPTC.PRODUCT,
                })
            );
        }
    }, [dispatch, countAllProducts, isCountAllProductsLoading]);
    

    useEffect(() => {
        if (searchParams) {
            const pageParam = searchParams.get(PRODUCT_PARAMS.NUMBER_PAGE__KEY);
            if (pageParam) {
                setPageNumber(+pageParam);
            }
        }
    }, [searchParams]);

    if (isProductLoading && isCountProductsLoading) 
        return <Loader />

    return (
        <WrapperSortFilter variant={ECatalogVariants.PRODUCTS} pageNumberKey={PRODUCT_PARAMS.NUMBER_PAGE__KEY}>
            <WrapperPagination
                amount={countProducts || 1}
                active={pageNumber}
                keyPageParam={PRODUCT_PARAMS.NUMBER_PAGE__KEY}
                set={setPageNumber}
                className={cl.block}
            >
                <WrapperDefaultProductNotFound showDefault={productList.length === 0}>
                    <ProductAutoList products={productList} view={viewProductList} className={className} />
                </WrapperDefaultProductNotFound>
            </WrapperPagination>
        </WrapperSortFilter>
    );
};
