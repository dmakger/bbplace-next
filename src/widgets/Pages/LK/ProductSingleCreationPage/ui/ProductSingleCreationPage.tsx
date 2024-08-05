"use client"

import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductSingleCreationPage.module.scss'
import { useEffect, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { CreationProductForm } from "@/features/Form/Product/ui/Creation/CreationProductForm"
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL"
import { ProductAPI } from "@/entities/Product/api/product.api"
import { skipToken } from "@reduxjs/toolkit/query"
import { IProduct, IProductAPI } from "@/entities/Product/model/product.model"
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api"
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api"
import { productApiListToProductList } from "@/entities/Product/lib/product.lib"

interface IProductSingleCreationPage {
    className?: string,
}

export const ProductSingleCreationPage = ({ className }: IProductSingleCreationPage) => {
    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // STATE
    const [groupId, setGroupId] = useState<string | null>(null)
    const [draftId, setDraftId] = useState<string | null>(null)
    const [products, setProducts] = useState<IProduct[]>([])

    // API
    const { data: productsAPI } = ProductAPI.useGetProductsByGroupQuery(groupId ?? skipToken, {refetchOnMountOrArgChange: true})
    const { data: draftAPI } = ProductAPI.useGetDraftQuery(draftId ?? skipToken, {refetchOnMountOrArgChange: true})
    const { data: currencies } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();

    // EFFECT
    useEffect(() => {
        if ((!currencies || !metrics) || !(productsAPI || draftAPI)) return
        const productsAPILoaded = (productsAPI ?? [draftAPI]) as IProductAPI[]

        setProducts(productApiListToProductList(productsAPILoaded, metrics, currencies))
    }, [productsAPI, draftAPI, currencies, metrics])

    console.log('qwe groupId', groupId)

    return (
        <div className={cls(cl.page, className)}>
            <SuspenseL.Any data={[
                { searchKey: "groupId", set: setGroupId },
                { searchKey: "draftId", set: setDraftId },
            ]}>
                <CreationProductForm />
            </SuspenseL.Any>
        </div>
    )
}
