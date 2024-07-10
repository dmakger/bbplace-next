"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FetchProduct.module.scss'
import { IProduct, IProductAPI } from "../../model/product.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ProductAPI } from "../../api/product.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { productApiToProduct } from "../../lib/product.lib";
import { FetchProductTypes } from "../../data/fetch.product.data";
import { skipToken } from "@reduxjs/toolkit/query";

interface FetchProductProps {
    set: Dispatch<SetStateAction<IProduct[]>>
    type: FetchProductTypes
    propsProduct?: any
    hasCategory?: boolean
}

/**
 * Данный компонент принимает в себя set, и записывает в него получаемые продукты с учетом передаваемых пропсов
 */
export const FetchProduct:FC<FetchProductProps> = ({set, type, propsProduct, hasCategory=false}) => {
    // STATE
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [productsAPI, setProductsAPI] = useState<IProductAPI[]>([])

    // API
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const { data: allProductsAPI } = ProductAPI.useGetProductsQuery(
        type === FetchProductTypes.All ? {...propsProduct} : skipToken, 
        { refetchOnMountOrArgChange: true }
    );
    const { data: byUserProductsAPI } = ProductAPI.useGetProductsByUserQuery(
        type === FetchProductTypes.ByUser ? {...propsProduct} : skipToken, 
        { refetchOnMountOrArgChange: true }
    );
    const { data: draftProductsAPI } = ProductAPI.useGetDraftsByUserQuery(
        type === FetchProductTypes.Draft ? {...propsProduct} : skipToken, 
        { refetchOnMountOrArgChange: true }
    );

    // EFFECT
    useEffect(() => {
        setProductsAPI(prev => {
            if (type === FetchProductTypes.All && allProductsAPI)
                return allProductsAPI
            if (type === FetchProductTypes.ByUser && byUserProductsAPI)
                return byUserProductsAPI
            if (type === FetchProductTypes.Draft && draftProductsAPI)
                return draftProductsAPI
            return prev
        })
    }, [type, allProductsAPI, byUserProductsAPI, draftProductsAPI])
    
    // SET CATEGORIES
    useEffect(() => {
        if (!hasCategory || !productsAPI) return;

        const fetchCategories = async () => {
            try {
                const categories = await Promise.all(
                    productsAPI.map(async (it) => {
                        const categoryResponse = await getCategory(it.categoryId).unwrap();
                        return categoryResponse[0]; // Assuming the response is an array and we need the first element
                    })
                );
                setCategoryList(categories);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, [hasCategory, allProductsAPI, getCategory]);
    
    
    // SET PRODUCTS
    useEffect(() => {
        if (productsAPI && set) {
            set(() => {
                return productsAPI.map((it, index) => {
                    let newProduct = { ...productApiToProduct({ productAPI: it }) }
                    if (hasCategory && categoryList)
                        newProduct.category = categoryList[index]
                    return newProduct
                })
            })
        }
    }, [set, productsAPI, hasCategory, categoryList])
    

    return (
        <></>
    )
}
