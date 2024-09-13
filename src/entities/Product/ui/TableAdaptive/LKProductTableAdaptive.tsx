"use client"

import { FC, useEffect, useState } from "react";

import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { LKProductTable } from "@/features/Table/ui/Product/LK/ui/LKProductTable";
import { FetchProduct } from "../FetchProduct/FetchProduct";
import { IProduct } from "../../model/product.model";
import { ProductLKSmartList } from "../LKProduct/ui/SmartList/ProductLKSmartList";
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { useAppSelector } from "@/storage/hooks";
import { FetchProductTypes } from "../../data/fetch.product.data";

interface LKProductTableAdaptiveProps{
    typeProduct: ProductsTypeLK,
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

    return (
        <>
            {typeFetchProduct && (
                <FetchProduct set={setProducts} type={typeFetchProduct} propsProduct={propsFetchProduct} hasCategory={true} />
            )}
            {is768 ? (
                <ProductLKSmartList typeProduct={typeProduct}/>
            ) : (
                <LKProductTable products={products} type={typeProduct} />
            )}
            <HandleSize set={setIs768} width={768} />
        </>
    )
}
