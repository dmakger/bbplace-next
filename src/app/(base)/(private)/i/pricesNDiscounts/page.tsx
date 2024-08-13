import { IPricesNDiscountsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { TabPage } from "@/features/TabPage"
import { ETabPageVariant } from "@/features/TabPage/model/tabPage.model"
import { SWITCH_SELECTOR_PRICES_N_DISCOUNTS } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"

export default function PricesNDiscountsPage() {

    const instructionText: string[] = [
        '1. Выгрузите таблицу с вашими товарами.',
        '2. Внесите нужные изменения и загрузите получившуюся таблицу.'
    ]

    const PRICES_N_DISCOUNTS_TAB: IPricesNDiscountsTab = {
        pricesNDiscounts: {
            optionTab: <TabPage instructionText={instructionText} variant={ETabPageVariant.PRICES_N_DISCOUNTS}/>,
            optionValue: String(SWITCH_SELECTOR_PRICES_N_DISCOUNTS.value)
        }
    }
    return (
        <Wrapper1280>
            <WrapperLKPT options={[SWITCH_SELECTOR_PRICES_N_DISCOUNTS]}
                pageTitle=""
                startPage={SWITCH_SELECTOR_PRICES_N_DISCOUNTS}
                optionsTab={PRICES_N_DISCOUNTS_TAB}
                isButtonRight={false} />
        </Wrapper1280>
    )
}