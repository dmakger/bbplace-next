'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { IOption } from "@/shared/model/option.model";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { LKPTPage } from "@/features/LKPTPage";
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PageTenderNew } from "@/widgets/Pages/LK/Tender/New/PageTenderNew";

// export default function LKTenderNewPage() {
//     return (
//         <SuspenseL>
//             <LKTenderNewChild />
//         </SuspenseL>
//     );
// };

// export const LKTenderNewChild: FC = () => {
export default function LKTenderNewPage() {
    // ROUTER
    const searchParams = useSearchParams();

    // STATE
    const [selectedOption, setSelectedOption] = useState<IOption>(
        toTenderType(searchParams.get('type') as string) === ETenderType.PURCHASE 
        ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION 
        : SWITCH_SELECTOR_SALE_TENDERS_OPTION
    )

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { optionTab: <PageTenderNew type={ETenderType.SALE}/> },
        purchase: { optionTab: <PageTenderNew type={ETenderType.PURCHASE}/> },
    }
    return (
        <Wrapper1280>
            <HeaderLKPT title={'Новый тендер'} 
                        selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
                        options={TENDER_TYPE_OPTIONS} optionsTab={{}}
                        isButtonAdd={false} />
            <LKPTPage optionsTab={OPTIONS_TAB} selectedOption={selectedOption} />
        </Wrapper1280>
    );
}
  