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
import { ETenderTypeEn, ITender } from '@/entities/Tender/model/tender.model'
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
import { Button } from '@/shared/ui/Button'
import { useNotify } from '@/features/Notify/lib/hooks'
import { ENotifyStatus } from '@/features/Notify/data/notify.data'
import { FavouriteAPI } from '@/entities/Favourite/api/favourite.api'
import { isAuth } from '@/entities/Auth/lib/auth-token.lib'
import { FavouriteType } from '@/entities/Favourite/data/favourite.data'
import { skipToken } from '@reduxjs/toolkit/query'
import { integrateFavoriteInList } from '@/entities/Favourite/lib/list.favourite.lib'


export const MainChildrenPage = () => {

    //STATE
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [tenderList, setTenderList] = useState<ITender[]>([]);
    const [supplierList, setSupplierList] = useState<ISupplier[]>([]);

    //API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: productsAPI } = ProductAPI.useGetProductsQuery({ limit: PRODUCT_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true });
    const { data: saleTendersAPI } = TenderAPI.useGetSaleTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: 0});
    const { data: purchaseTendersAPI } = TenderAPI.useGetPurchaseTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: 0});
    const { data: suppliersAPI } = SupplierAPI.useGetSuppliersQuery({ limit: SUPPLIER_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true })

    const { data: productsFavorite } = FavouriteAPI.useAreInFavoritesQuery(
        isAuth() && productsAPI ? {objectIds: productsAPI.map(it => it.id), objectType: FavouriteType.Product} : skipToken,
        { refetchOnMountOrArgChange: true }
    )
    const { data: tenderSaleFavorite } = FavouriteAPI.useAreInFavoritesQuery(
        isAuth() && saleTendersAPI ? {objectIds: saleTendersAPI.map(it => it.id), objectType: FavouriteType.TenderSale} : skipToken,
        { refetchOnMountOrArgChange: true }
    )
    const { data: tenderPurchaseFavorite } = FavouriteAPI.useAreInFavoritesQuery(
        isAuth() && purchaseTendersAPI ? {objectIds: purchaseTendersAPI.map(it => it.id), objectType: FavouriteType.TenderSale} : skipToken,
        { refetchOnMountOrArgChange: true }
    )

    
    //EFFECT
    useEffect(() => {
        if (productsAPI && metrics && currencyList) {
            const newProducts = productApiListToProductList(productsAPI, metrics, currencyList)
            setProductList(integrateFavoriteInList<IProduct>(newProducts, productsFavorite));
        }
    }, [productsAPI, metrics, currencyList, productsFavorite]);

    useEffect(() => {
        if (saleTendersAPI && purchaseTendersAPI && metrics && currencyList) {
            const saleTenders = tenderAPIListToTenderList(saleTendersAPI, metrics, currencyList, ETenderTypeEn.SALE)
            const purchaseTenders = tenderAPIListToTenderList(purchaseTendersAPI, metrics, currencyList, ETenderTypeEn.PURCHASE)
            const allSortedByDateTenders = [
                ...integrateFavoriteInList<ITender>(saleTenders, tenderSaleFavorite),
                ...integrateFavoriteInList<ITender>(purchaseTenders, tenderPurchaseFavorite)
            ].sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
            setTenderList(allSortedByDateTenders);
        }
    }, [saleTendersAPI, purchaseTendersAPI, tenderSaleFavorite, tenderPurchaseFavorite,  metrics, currencyList]);

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

    const {notify} = useNotify()

    const addNotify = () => {
        notify({text: "Гойда", status: ENotifyStatus.Success})
    }

    return (
        <Wrapper1280 classNameContent={cl.content}>
            {/* <Button onClick={addNotify} /> */}
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
            {/* <AboutBB /> */}
        </Wrapper1280>
    )
}
