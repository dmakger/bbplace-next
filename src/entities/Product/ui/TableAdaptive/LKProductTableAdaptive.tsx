"use client"

import { FC, SetStateAction, useEffect, useMemo, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableAdaptive.module.scss'
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { LKProductTable } from "@/features/Table/ui/Product/LK/ui/LKProductTable";
import { FetchProduct } from "../FetchProduct/FetchProduct";
import { IProduct } from "../../model/product.model";
import { ProductLK, ProductLKList } from "../LKProduct";
import { EProductLKVariants } from "../LKProduct/model/productLK.model";
import { ProductLKSmartList } from "../LKProduct/ui/SmartList/ProductLKSmartList";
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { ProductAPI } from "../../api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/storage/hooks";
import { FetchProductTypes } from "../../data/fetch.product.data";

interface LKProductTableAdaptiveProps{
    typeProduct: ProductsTypeLK
    className?: string,
}

export const LKProductTableAdaptive:FC<LKProductTableAdaptiveProps> = ({typeProduct, className}) => {
    // STATE
    const [is768, setIs768] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [typeFetchProduct, setTypeFetchProduct] = useState<FetchProductTypes | undefined>()
    const [propsFetchProduct, setPropsFetchProduct] = useState({})

    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // EFFECT
    useEffect(() => {
        if (typeProduct === ProductsTypeLK.Active && userId) {
            setTypeFetchProduct(FetchProductTypes.ByUser)
            setPropsFetchProduct({ userId, limit: 10000, page: 0 })
        }
        if (typeProduct === ProductsTypeLK.Draft) {
            setTypeFetchProduct(FetchProductTypes.Draft)
            setPropsFetchProduct({ limit: 10000, page: 0 })
        }
    }, [typeProduct, userId])

    // const productProps = useMemo(() => {
    //     if (typeProduct === ProductsTypeLK.Active)
    // }, [typeProduct, userId])


    return (
        <>
            {typeFetchProduct && (
                <FetchProduct set={setProducts} type={typeFetchProduct} propsProduct={propsFetchProduct} hasCategory={true} />
            )}
            {is768 ? (
                // <ProductLKList products={products} variant={EProductLKVariants.DEFAULT} />
                <ProductLKSmartList typeProduct={typeProduct} />
            ) : (
                <LKProductTable products={products} type={typeProduct} />
            )}
            {/* <ProductLKSmartList typeProduct={typeProduct} /> */}
            <HandleSize set={setIs768} width={768} />
        </>
    )
}
