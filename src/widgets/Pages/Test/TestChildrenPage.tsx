"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TestChildrenPage.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { PRODUCT_ARGS_REQUEST } from "@/entities/Product/data/product.data";
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api";
import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { isAuth } from "@/entities/Auth/lib/auth-token.lib";
import { productApiListToProductList } from "@/entities/Product/lib/product.lib";
import { integrateFavoriteInList } from "@/entities/Favourite/lib/list.favourite.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { CardsProductSlider } from "@/features/MainPageCardSliderBlock/components/Product/CardsProductSlider";
import { SliderPagingVariant } from "@/shared/data/sliderT.data";

interface TestChildrenPageProps{
    className?: string,
}

export const TestChildrenPage:FC<TestChildrenPageProps> = ({className}) => {
    //STATE
    const [productList, setProductList] = useState<IProduct[]>([]);

    //API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: productsAPI } = ProductAPI.useGetProductsQuery({ limit: PRODUCT_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true });
    
    const { data: productsFavorite } = FavouriteAPI.useAreInFavoritesQuery(
        isAuth() && productsAPI ? {objectIds: productsAPI.map(it => it.id), objectType: FavouriteType.Product} : skipToken,
        { refetchOnMountOrArgChange: true }
    )
    
    //EFFECT
    useEffect(() => {
        if (productsAPI && metrics && currencyList) {
            const newProducts = productApiListToProductList(productsAPI, metrics, currencyList)
            setProductList(integrateFavoriteInList<IProduct>(newProducts, productsFavorite));
        }
    }, [productsAPI, metrics, currencyList, productsFavorite]);
    

    return (
        <CardsProductSlider 
            items={productList} 
            gap={20} pagingVariant={SliderPagingVariant.Full}  />
    )
}
