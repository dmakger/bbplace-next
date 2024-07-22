'use client'

import { useSearchParams } from "next/navigation";

import { ETenderType } from "@/entities/Tender/model/tender.model";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PageTenderNew } from "@/widgets/Pages/LK/Tender/New/PageTenderNew";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";

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
    // const [selectedOption, setSelectedOption] = useState<IOption>(
    //     toTenderType(searchParams.get('type') as string) === ETenderType.PURCHASE 
    //     ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION 
    //     : SWITCH_SELECTOR_SALE_TENDERS_OPTION
    // )

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { 
            optionTab: <PageTenderNew type={ETenderType.SALE}/>,
            optionValue: String(SWITCH_SELECTOR_SALE_TENDERS_OPTION.value)
        },
        purchase: { 
            optionTab: <PageTenderNew type={ETenderType.PURCHASE}/>,
            optionValue: String(SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION.value)
        },
    }
    return (
        <Wrapper1280>
            {/* <HeaderLKPT title={'Новый тендер'} 
                        selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
                        options={TENDER_TYPE_OPTIONS} optionsTab={{}}
                        isButtonAdd={false} />
            <LKPTPage optionsTab={OPTIONS_TAB} selectedOption={selectedOption} /> */}
            <WrapperLKPT pageTitle="Новый тендер" isButtonAdd={false}
            options={TENDER_TYPE_OPTIONS} startPage={SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION} optionsTab={OPTIONS_TAB}/>
        </Wrapper1280>
    );
}
  