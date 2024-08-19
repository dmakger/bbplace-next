'use client'

import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { LK_FAVOURITES_PAGE, SWITCH_SELECTOR_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { IOptionTabFavourites } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api"
import { FavouriteType } from "@/entities/Favourite/data/favourite.data"
import { IProductAPI } from "@/entities/Product/model/product.model"
import { getFavouriteArrayLength } from "@/entities/Favourite/lib/favourite.lib"


export const FavouritesChildrenPage = () => {
    //API
    const {data: favouriteProducts} = FavouriteAPI.useGetFavouriteProductsQuery(FavouriteType.Product)
    const {data: favouritePurchaseTenders} = FavouriteAPI.useGetFavouritePurchasesQuery(FavouriteType.TenderPurchase)
    const {data: favouriteSaleTenders} = FavouriteAPI.useGetFavouriteSalesQuery(FavouriteType.TenderSale)
    // const {data: favouriteSuppliers} = FavouriteAPI.useGetFavouritesu(FavouriteType.Supplier)

    

    const LK_FAVOURITES_OPTIONS_TAB: IOptionTabFavourites = {
        products: {
            optionTab: null,
            optionQuantity: getFavouriteArrayLength(favouriteProducts as IProductAPI[])
        },
        tenderPurchase: {
            optionTab: null,
            optionQuantity: favouritePurchaseTenders?.length
        },
        tenderSale: {
            optionTab: null,
            optionQuantity: favouriteSaleTenders?.length
        },
        suppliers: {
            optionTab: null,
            // optionQuantity: 0
        },
        
    }
    return (
        <Wrapper1280>
            <SuspenseL >
                <WrapperLKPT options={LK_FAVOURITES_PAGE}
                    pageTitle="Избранное"
                    startPage={SWITCH_SELECTOR_PRODUCTS_OPTION}
                    optionsTab={LK_FAVOURITES_OPTIONS_TAB}
                    isButtonRight={false} />
            </SuspenseL>
        </Wrapper1280>
    )
}
