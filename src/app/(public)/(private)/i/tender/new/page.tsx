'use client'

import { useState } from "react";

import { ETenderType } from "@/entities/Tender/model/tender.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { IOption } from "@/shared/model/option.model";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { LKPTPage } from "@/features/LKPTPage";
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PageTenderNew } from "@/widgets/Pages/LK/Tender/New/PageTenderNew";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";


export default function LKTenderNewPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()
    const [selectedOption, setSelectedOption] = useState<IOption>(
        tenderType === ETenderType.PURCHASE 
        ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION 
        : SWITCH_SELECTOR_SALE_TENDERS_OPTION
    )

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { optionTab: <PageTenderNew type={ETenderType.SALE}/> },
        purchase: { optionTab: <PageTenderNew type={ETenderType.PURCHASE}/> },
    }
    return (
        <Wrapper1280>
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <HeaderLKPT title={'Новый тендер'} 
                            buttonBackProps={{href: DASHBOARD_PAGES.TENDERS.path}}
                            selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
                            options={TENDER_TYPE_OPTIONS} optionsTab={{}}
                            isButtonAdd={false} />
                <LKPTPage optionsTab={OPTIONS_TAB} selectedOption={selectedOption} />
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}
  