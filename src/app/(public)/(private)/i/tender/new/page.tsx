'use client'

import { useState } from "react";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PageTenderNew } from "@/widgets/Pages/LK/Tender/New/PageTenderNew";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";


export default function LKTenderNewPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()

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
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <WrapperLKPT pageTitle="Новый тендер" isButtonRight={false}
                             buttonBackProps={{href: DASHBOARD_PAGES.TENDERS.path}}
                             options={TENDER_TYPE_OPTIONS} optionsTab={OPTIONS_TAB}
                             startPage={tenderType === ETenderType.PURCHASE ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION : SWITCH_SELECTOR_SALE_TENDERS_OPTION}/>
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}
  