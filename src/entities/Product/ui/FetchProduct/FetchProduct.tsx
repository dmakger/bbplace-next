"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FetchProduct.module.scss'
import { IProduct } from "../../model/product.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ProductAPI } from "../../api/product.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { productApiToProduct } from "../../lib/product.lib";

interface FetchProductProps {
    set: Dispatch<SetStateAction<IProduct[]>>
    propsProduct?: any
    hasCategory?: boolean
}

/**
 * Данный компонент принимает в себя set, и записывает в него получаемые продукты с учетом передаваемых пропсов
 */
export const FetchProduct:FC<FetchProductProps> = ({set, propsProduct, hasCategory=false}) => {
    // STATE
    const [categoryList, setCategoryList] = useState<ICategory[]>([])

    // API
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        // { limit: 24, page: 11 }, 
        {...propsProduct}, 
        { refetchOnMountOrArgChange: true }
    );
    
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
    }, [hasCategory, productsAPI, getCategory]);
    
    
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
