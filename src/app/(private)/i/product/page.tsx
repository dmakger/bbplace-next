'use client'
import cl from './_LKProductPage.module.scss'
import { SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { HeaderLKPT } from "@/features/Headers/HeaderLK"
import { useState } from 'react'
import { IOption } from '@/shared/model/option.model'
import { LKPTPage } from '@/features/LKPTPage'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'


export default function LKProductPage() {

    const [selectedOption, setSelectedOption] = useState<IOption>(SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION)

    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        active: { optionTab: <>dsadasda</>, optionQuantity: 22 },
        drafts: { optionTab: <>dddddd</>, optionQuantity: 3 },
        woPrice: { optionTab: <>ddddwwww</>, optionQuantity: 0 },
    }

    return (
        <Wrapper1280>
            <div className={cl.LKProductPage}>
                <HeaderLKPT title={'Мои товары'}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    optionsTab={MY_PRODUCTS_OPTIONS_TAB} />
                {/* <DetailedPageInfo options={[SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION ]}
            optionsTab={MY_PRODUCTS_OPTIONS_TAB} defaultOption={SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION} variantSS={ESwitchSelectorVariants.TABS}/> */}
                <LKPTPage optionsTab={MY_PRODUCTS_OPTIONS_TAB}
                    selectedOption={selectedOption} />
            </div>
        </Wrapper1280>
    )
}
