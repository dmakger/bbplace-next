'use client'

import cl from './_FavouritesChildrenPage.module.scss'

import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { IOptionTabFavourites } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api"
import { IProduct, IProductAPI } from "@/entities/Product/model/product.model"
import { getFavouriteArray } from "@/entities/Favourite/lib/favourite.lib"
import { TenderFavouriteList } from "@/entities/Tender/ui/Favourite/TenderFavouriteList"
import { SuspenseLAny } from "@/shared/ui/Wrapper/SuspenseL/Any/SuspenseLAny"
import { useEffect, useMemo, useState } from "react"
import { SWITCH_SELECTOR__FAVOURITE__OPTIONS, SWITCH_SELECTOR__PRODUCT_FAVOURITE__OPTION, SWITCH_SELECTOR__PURCHASE_TENDER_FAVOURITE__OPTION, SWITCH_SELECTOR__SALE_TENDER_FAVOURITE__OPTION, SwitchSelectorFavourite } from "@/shared/ui/SwitchSelector/data/favourite.switchSelector.data"
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { IPurchaseTender, ISaleTender } from '@/entities/Tender/model/tender.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { tenderAPIListToTenderList } from '@/entities/Tender/lib/process.tender.lib'
import { ProductFavouriteList } from '@/entities/Product/ui/Favourite/ProductFavouriteList'


export const FavouritesChildrenPage = () => {
    // STATE
    const [typeFavourite, setTypeFavourite] = useState<string | undefined>()
    const [favouriteProducts, setFavouriteProducts] = useState<IProduct[]>([])
    const [favouritePurchaseTenders, setFavouritePurchaseTenders] = useState<IPurchaseTender[]>([])
    const [favouriteSaleTenders, setFavouriteSaleTenders] = useState<ISaleTender[]>([])

    //API
    const {data: favouriteProductsAPI} = FavouriteAPI.useGetFavouriteProductsQuery()
    const {data: favouritePurchaseTendersAPI} = FavouriteAPI.useGetFavouritePurchasesQuery()
    const {data: favouriteSaleTendersAPI} = FavouriteAPI.useGetFavouriteSalesQuery()

    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()  

    // EFFECT
    useEffect(() => {
        if (currencyList === undefined || metrics === undefined)
            return

        if (favouriteProductsAPI !== undefined) {
            setFavouriteProducts(productApiListToProductList(getFavouriteArray(favouriteProductsAPI) as IProductAPI[], metrics, currencyList))
        }

        if (favouritePurchaseTendersAPI !== undefined) {
            setFavouritePurchaseTenders(tenderAPIListToTenderList(favouritePurchaseTendersAPI, metrics, currencyList) as IPurchaseTender[])
        }

        if (favouriteSaleTendersAPI !== undefined) {
            setFavouriteSaleTenders(tenderAPIListToTenderList(favouriteSaleTendersAPI, metrics, currencyList) as ISaleTender[])
        }
    }, [currencyList, metrics, favouriteProductsAPI, favouritePurchaseTendersAPI, favouriteSaleTendersAPI])
    
    // OPTIONS
    const LK_FAVOURITES_OPTIONS_TAB: IOptionTabFavourites = useMemo(() => ({
        [SwitchSelectorFavourite.Product]: {
            optionTab: (
                <ProductFavouriteList items={favouriteProducts} className={cl.list} classNameItem={cl.item} />
            ),
            optionQuantity: favouriteProducts.length,
            // optionQuantity: getFavouriteArrayLength(favouriteProducts as IProductAPI[]),
            optionValue: String(SWITCH_SELECTOR__PRODUCT_FAVOURITE__OPTION.value),
        },
        [SwitchSelectorFavourite.Sale]: {
            optionTab: favouriteSaleTenders ? (
                <TenderFavouriteList items={favouriteSaleTenders} className={cl.list} classNameItem={cl.item} />
            ) : null,
            optionQuantity: favouriteSaleTenders?.length,
            optionValue: String(SWITCH_SELECTOR__SALE_TENDER_FAVOURITE__OPTION.value),
        },
        [SwitchSelectorFavourite.Purchase]: {
            optionTab: favouritePurchaseTenders ? (
                <TenderFavouriteList items={favouritePurchaseTenders} className={cl.list} classNameItem={cl.item} />
            ) : null,
            optionQuantity: favouritePurchaseTenders?.length,
            optionValue: String(SWITCH_SELECTOR__PURCHASE_TENDER_FAVOURITE__OPTION.value),
        },
    }), [favouriteProducts, favouriteSaleTenders, favouritePurchaseTenders])

    // HTML
    return (
        <Wrapper1280>
            <SuspenseL>
                <SuspenseLAny data={[
                    { searchKey: "type", set: setTypeFavourite },
                ]}>
                    <WrapperLKPT options={SWITCH_SELECTOR__FAVOURITE__OPTIONS}
                        pageTitle="Избранное"
                        currentKey={typeFavourite}
                        optionsTab={LK_FAVOURITES_OPTIONS_TAB}
                        isButtonRight={false} />
                </SuspenseLAny>
            </SuspenseL>
        </Wrapper1280>
    )
}
