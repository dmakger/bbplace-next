'use client'
import { SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION, SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { DetailedPageInfo } from "@/features/DetailedPageInfo"
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { ESwitchSelectorVariants } from "@/shared/ui/SwitchSelector/model/switchSelector.model"


export default function MyProductsPage() {
    
    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        active: { optionTab: <>dsadasda</>, optionQuantity: 22 },
        drafts: { optionTab: <>dddddd</>, optionQuantity: 3 },
        woPrice: { optionTab: <>ddddwwww</>, optionQuantity: 0 },
    }

    return (
        <div>
            <DetailedPageInfo options={[SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION,SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION ]}
            optionsTab={MY_PRODUCTS_OPTIONS_TAB} defaultOption={SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION} variantSS={ESwitchSelectorVariants.TABS}/>
        </div>
    )
}
