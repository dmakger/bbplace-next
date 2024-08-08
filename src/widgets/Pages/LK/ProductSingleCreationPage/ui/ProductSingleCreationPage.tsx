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
import { ProductTypeArticleBlock } from "@/entities/Product/ui/TypeArticle/Block/ProductTypeArticleBlock"
import { TListItemOnClick } from "@/shared/model/list.model"
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api"
import { productToPropsProductForm } from "@/features/Form/Product/lib/product.form.lib"
import { IPropsProductForm } from "@/features/Form/Product/model/product.form.model"

interface IProductSingleCreationPage {
    groupId?: string
    draftId?: string
    className?: string,
}

export const ProductSingleCreationPage = ({ groupId, draftId, className }: IProductSingleCreationPage) => {
    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // STATE
    const [products, setProducts] = useState<IProduct[]>([])
    const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>(undefined)
    const [currentPropsProduct, setCurrentPropsProduct] = useState<IPropsProductForm | undefined>(undefined)

    // API
    const { data: productsAPI } = ProductAPI.useGetProductsByGroupQuery(groupId ?? skipToken, {refetchOnMountOrArgChange: true})
    // const { data: productsAPI } = ProductAPI.useGetProductsQuery(
    //     { limit: 5, page: 3 },
    //     { refetchOnMountOrArgChange: true }
    // );
    const { data: draftAPI } = ProductAPI.useGetDraftQuery(draftId ?? skipToken, {refetchOnMountOrArgChange: true})
    const { data: currencies } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: countries } = CountryAPI.useGetCountriesQuery();

    // EFFECT
    useEffect(() => {
        if ((!currencies || !metrics) || !(productsAPI || draftAPI)) return
        const productsAPILoaded = (productsAPI ?? [draftAPI]) as IProductAPI[]

        setProducts(productApiListToProductList(productsAPILoaded, metrics, currencies, countries))
    }, [productsAPI, draftAPI, currencies, metrics])

    // HANDLE
    // create product
    const handleOnCreateProduct = () => {
        setCurrentProduct(undefined)
    }
    // on product
    const handleOnProduct: TListItemOnClick<IProduct> = (it, _) => {
        if (metrics === undefined) return
        setCurrentProduct(it)
        setCurrentPropsProduct(productToPropsProductForm(it, metrics))
    }
    // on delete
    const handleOnDelete: TListItemOnClick<IProduct> = (it, _) => {}

    console.log('qwe product form edit', products)

    return (
        <div className={cls(cl.page, className)}>
            <ProductTypeArticleBlock items={products} 
                                        onCreateProduct={handleOnCreateProduct}
                                        onClickItem={handleOnProduct}
                                        onDeleteItem={handleOnDelete}
                                        componentProps={{
                                        onClickDelete: handleOnDelete,
                                        }}
                                        activeId={currentProduct ? currentProduct.id : undefined} />
            <CreationProductForm data={currentPropsProduct} isDraft={draftId !== null} />
        </div>
    )
}
