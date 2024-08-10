"use client"

import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductSingleCreationPage.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { ProductForm } from "@/features/Form/Product/ui/Single/ProductForm"
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
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { productFormToCreateProduct, productFormToCreateProductTest } from "@/entities/Product/serializer/propsCreate.product.serializer"
import { IPropsCreateProduct } from "@/entities/Product/model/props.product.model"

interface IProductSingleCreationPage {
    groupId?: string | null
    productId?: string | null
    isDraft?: boolean
    className?: string,
}

export const ProductSingleCreationPage = ({ groupId, productId, isDraft=false, className }: IProductSingleCreationPage) => {
    // ROUTE
    const router = useRouter();

    // RTK
    const { id: userId } = useAppSelector(state => state.user)
    
    // REF
    const productFormRef = useRef<{handleOnClick: () => void} | null>(null)

    // STATE
    // const [isEdit, setIsEdit] = useState(!!productId)
    const [products, setProducts] = useState<IProduct[]>([])
    const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>()
    const [currentPropsProduct, setCurrentPropsProduct] = useState<IPropsProductForm | undefined>()
    const [prevPropsProduct, setPrevPropsProduct] = useState<IPropsProductForm | undefined>()

    // API
    const { data: productsAPI } = ProductAPI.useGetProductsByGroupQuery(!isDraft && groupId ? groupId : skipToken, {refetchOnMountOrArgChange: true})
    const { data: draftsAPI } = ProductAPI.useGetDraftsByGroupQuery(isDraft && groupId ? groupId : skipToken, {refetchOnMountOrArgChange: true})
    const { data: currencies } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: countries } = CountryAPI.useGetCountriesQuery();
    const [ createProduct ] = ProductAPI.useCreateProductMutation()
    const [ addProductToGroup ] = ProductAPI.useAddProductToGroupMutation()
    const [ deleteProduct ] = ProductAPI.useDeleteProductMutation()

    // EFFECT
    const isEditForm = useMemo(() => !!productId, [productId])

    useEffect(() => {
        if ((!currencies || !metrics || !countries) || !(productsAPI || draftsAPI)) return
        const productsAPILoaded = (isDraft ? draftsAPI : productsAPI) as IProductAPI[]

        setProducts(prevProducts => {
            const newProducts = productApiListToProductList(productsAPILoaded, metrics, currencies, countries);
            if (JSON.stringify(prevProducts) !== JSON.stringify(newProducts)) {
                return newProducts;
            }
            return prevProducts;
        })
    }, [productsAPI, draftsAPI, currencies, metrics, countries])

    useEffect(() => {
        if (!productId || products.length === 0) return

        const _currentProduct = products.find(it => it.id === +productId)
        if (_currentProduct) {
            // swapProduct(_currentProduct)
            setCurrentProduct(_currentProduct)
            setCurrentPropsProduct(productToPropsProductForm(_currentProduct))
        }
    }, [productId, products])

    // HANDLE
    // сбор данных из формы
    const handleGetFormData = () => {
        if (productFormRef.current) {
            productFormRef.current.handleOnClick()
        }
    }

    // create product
    const handleOnCreateProduct = async () => {
        if (!groupId || !isEditForm) return
        setCurrentProduct(undefined)
        setCurrentPropsProduct(undefined)
        await handleGetFormData()
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: +groupId}).path);
    }
    // on product
    const handleOnProduct: TListItemOnClick<IProduct> = async (it, _) => {
        if (currentProduct && it.id === currentProduct.id) return
        if (currentProduct) await handleGetFormData()
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: it.groupId!, id: it.id}).path);
    }
    // on delete
    const handleOnDelete: TListItemOnClick<IProduct> = async (it, _) => {
        await deleteProduct(it.id).then(() => {
            setProducts(prev => prev.filter(prevItem => prevItem.id !== it.id))
            if (groupId) {
                router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: +groupId}).path);
            }
        })
    }

    // load
    const handleLoadProduct = async (formData: IPropsProductForm) => {
        console.log('qwe load data', formData, currentPropsProduct)
        if (!isEditForm && groupId) {
            // ! PRODUCTION
            // const serializerData = productFormToCreateProduct(formData, userId)
            // ! TEST
            // const serializerData = productFormToCreateProductTest()
            // console.log('qwe serializer data', serializerData)
            // const createdProductId = await createProduct(serializerData).unwrap()
            // console.log('qwe createdProductId', createdProductId)
            // await addProductToGroup({groupId: +groupId, productId: createdProductId}).then(() => {
            //     router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: +groupId, id: createdProductId}).path);
            // })
        }
    }

    return (
        <div className={cls(cl.page, className)}>
            <ProductTypeArticleBlock items={products} 
                onCreateProduct={handleOnCreateProduct}
                onClickItem={handleOnProduct}
                onDeleteItem={handleOnDelete}
                componentProps={{ onClickDelete: handleOnDelete }}
                activeId={currentProduct ? currentProduct.id : undefined} />
            <ProductForm ref={productFormRef} data={currentPropsProduct} loadFormData={handleLoadProduct} isEdit={isEditForm} />
            <>
                {/* {JSON.stringify(productFormToCreateProductTest())} */}
                {products && (JSON.stringify(products.map(it => it.id)))}
            </>
        </div>
    )
}
