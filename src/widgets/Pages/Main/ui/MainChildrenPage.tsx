'use client'

import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import cl from './_MainChildrenPage.module.scss'
import { ArticleForSuppliersOrBuyers } from '../components/ArticleForSuppliersOrBuyers/ArticleForSuppliersOrBuyers'
import { EArticleForSuppliersOrBuyersVariants, IMainPageCardSliderBlockItem } from '../model/mainChildrenPage.model'
import { AboutBB } from '../components/AboutBB/AboutBB'
import { PrimeList } from '../components/PrimeList/PrimeList'
import { MainPageCardSliderBlock } from '@/features/MainPageCardSliderBlock'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { CardsProductSlider } from '@/features/MainPageCardSliderBlock/components/Product/CardsProductSlider'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { useEffect, useState } from 'react'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { PRODUCT_ARGS_REQUEST } from '@/entities/Product/data/product.data'
import { TenderAPI } from '@/entities/Tender/api/tender.api'
import { TENDER_ARGS_REQUEST } from '@/entities/Tender/data/tender.data'
import { ITender } from '@/entities/Tender/model/tender.model'
import { tenderAPIListToTenderList } from '@/entities/Tender/lib/process.tender.lib'
import { CardsTenderSlider } from '@/features/MainPageCardSliderBlock/components/Tender/CardsTenderSlider'
import { SupplierAPI } from '@/entities/Supplier/api/supplier.api'
import { SUPPLIER_ARGS_REQUEST } from '@/entities/Supplier/data/supplier.data'
import { ISupplier } from '@/entities/Supplier/model/supplier.model'
import { supplierApiListToSupplierList } from '@/entities/Supplier/lib/process.supplier.lib'
import { CardsSupplierSlider } from '@/features/MainPageCardSliderBlock/components/Supplier/CardsSupplierSlider'
import { SliderPagingVariant } from '@/shared/data/sliderT.data'
import { PrimeBannerSlider } from '../components/PrimeBannerSlider/PrimeBannerSlider'
import { PRIME_SLIDER_LIST } from '../data/mainChildrenPage.data'
import { ModalAction } from '@/shared/ui/Modal/ui/Action/ModalAction'


export const MainChildrenPage = () => {

    //STATE
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [tenderList, setTenderList] = useState<ITender[]>([]);
    const [supplierList, setSupplierList] = useState<ISupplier[]>([]);

    //API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: productsAPI } = ProductAPI.useGetProductsQuery({ limit: PRODUCT_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true });
    const { data: saleTendersApi } = TenderAPI.useGetSaleTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: 0});
    const { data: purchaseTendersApi } = TenderAPI.useGetPurchaseTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: 0});
    const { data: suppliersAPI } = SupplierAPI.useGetSuppliersQuery({ limit: SUPPLIER_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true })

    
    //EFFECT
    useEffect(() => {
        if (productsAPI && metrics && currencyList) 
            setProductList(productApiListToProductList(productsAPI, metrics, currencyList));
    }, [productsAPI, metrics, currencyList]);

    useEffect(() => {
        if (saleTendersApi && purchaseTendersApi && metrics && currencyList) {
            const allSortedByDateTenders = [
                ...tenderAPIListToTenderList(saleTendersApi, metrics, currencyList),
                ...tenderAPIListToTenderList(purchaseTendersApi, metrics, currencyList)
            ].sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
            setTenderList(allSortedByDateTenders);
        }
    }, [saleTendersApi, purchaseTendersApi, metrics, currencyList]);

    useEffect(() => {
        if(suppliersAPI)
            setSupplierList(supplierApiListToSupplierList(suppliersAPI))
    }, [suppliersAPI])


    const mainPageCardSliderBlockArray: IMainPageCardSliderBlockItem[] = [
        {
            title: 'Новые товары',
            buttonTitle: 'Все товары',
            buttonHref: MAIN_PAGES.PRODUCTS.path,
            children: <CardsProductSlider items={productList} gap={20} className={cl.list} classNameItem={cl.productItem} pagingVariant={SliderPagingVariant.Full} />
        },
        {
            title: 'Новые тендеры',
            buttonTitle: 'Все тендеры',
            buttonHref: MAIN_PAGES.TENDERS.path,
            children: <CardsTenderSlider items={tenderList} gap={20} className={cl.list} classNameItem={cl.tenderItem} classNameLine={cl.line} classNameBlockSupplier={cl.blockSupplier} />
        },
        {
            title: 'Надёжные поставщики',
            buttonTitle: 'Все поставщики',
            buttonHref: MAIN_PAGES.SUPPLIERS.path,
            children: <CardsSupplierSlider items={supplierList} gap={20} className={cl.list} classNameItem={cl.supplierItem} classNameSupplierWNav={cl.supplierWNav} classNameBaseSupplier={cl.baseSupplier} />
        }
    ]

    return (
        <Wrapper1280 classNameContent={cl.content}>
            <div className={cl.topContainer}>
                <PrimeBannerSlider items={PRIME_SLIDER_LIST}/>
                <PrimeList />
            </div>
            <div className={cl.articles}>
                <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.BUYERS} />
                <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.SUPPLIERS} />
            </div>
            {mainPageCardSliderBlockArray.map(it => (
                <MainPageCardSliderBlock
                    key={it.title}
                    title={it.title}
                    buttonTitle={it.buttonTitle}
                    buttonHref={it.buttonHref}
                    children={it.children} />
            ))}
            <AboutBB />
        </Wrapper1280>
    )
}
