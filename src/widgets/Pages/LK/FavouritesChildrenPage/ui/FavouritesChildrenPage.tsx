'use client'

import cl from './_FavouritesChildrenPage.module.scss'

import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { IOptionTabFavourites } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api"
import { IProductAPI } from "@/entities/Product/model/product.model"
import { getFavouriteArrayLength } from "@/entities/Favourite/lib/favourite.lib"
import { TenderFavouriteList } from "@/entities/Tender/ui/Favourite/TenderFavouriteList"
import { SuspenseLAny } from "@/shared/ui/Wrapper/SuspenseL/Any/SuspenseLAny"
import { useState } from "react"
import { SWITCH_SELECTOR__FAVOURITE__OPTIONS, SWITCH_SELECTOR__PRODUCT_FAVOURITE__OPTION, SWITCH_SELECTOR__PURCHASE_TENDER_FAVOURITE__OPTION, SWITCH_SELECTOR__SALE_TENDER_FAVOURITE__OPTION, SwitchSelectorFavourite } from "@/shared/ui/SwitchSelector/data/favourite.switchSelector.data"


export const FavouritesChildrenPage = () => {
    // STATE
    const [typeFavourite, setTypeFavourite] = useState<string | undefined>()

    //API
    const {data: favouriteProducts} = FavouriteAPI.useGetFavouriteProductsQuery()
    const {data: favouritePurchaseTenders} = FavouriteAPI.useGetFavouritePurchasesQuery()
    const {data: favouriteSaleTenders} = FavouriteAPI.useGetFavouriteSalesQuery()
    
    // OPTIONS
    const LK_FAVOURITES_OPTIONS_TAB: IOptionTabFavourites = {
        [SwitchSelectorFavourite.Product]: {
            optionTab: null,
            optionQuantity: getFavouriteArrayLength(favouriteProducts as IProductAPI[]),
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
    }

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
