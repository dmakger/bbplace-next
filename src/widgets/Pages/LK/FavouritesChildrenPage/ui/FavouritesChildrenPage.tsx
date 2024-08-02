'use client'

import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { LK_FAVOURITES_PAGE, SWITCH_SELECTOR_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { IOptionTabFavourites } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"

interface IFavouritesChildrenPage{
    className?: string,

}

export const FavouritesChildrenPage = ({className}: IFavouritesChildrenPage) => {

    const LK_FAVOURITES_OPTIONS_TAB: IOptionTabFavourites = {
        products: {
            optionTab: null,
            optionQuantity: 1
        },
        tenderPurchase: {
            optionTab: null,
            optionValue: '1'
        },
        tenderSale: {
            optionTab: null,
            optionValue: '1'
        },
        suppliers: {
            optionTab: null,
            optionValue: '1'
        },
        
    }
    return (
        <Wrapper1280>
            <SuspenseL >
                <WrapperLKPT options={LK_FAVOURITES_PAGE}
                    pageTitle="Избранное"
                    startPage={SWITCH_SELECTOR_PRODUCTS_OPTION}
                    optionsTab={LK_FAVOURITES_OPTIONS_TAB}
                    isButtonAdd={false} />
            </SuspenseL>
        </Wrapper1280>
    )
}
