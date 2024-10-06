'use client'

import { useState } from "react";
import { ETenderType, ETenderTypeEn } from "@/entities/Tender/model/tender.model";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PageTenderNew } from "@/widgets/Pages/LK/Tender/New/PageTenderNew";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { SWITCH_SELECTOR__PURCHASE_TENDER__OPTION, SWITCH_SELECTOR__SALE_TENDER__OPTION, SWITCH_SELECTOR__TENDER__OPTIONS } from "@/shared/ui/SwitchSelector/data/tender.switchSelector.data";


export default function LKTenderNewPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { 
            optionTab: <PageTenderNew type={ETenderType.SALE}/>,
            optionValue: String(SWITCH_SELECTOR__SALE_TENDER__OPTION.value)
        },
        purchase: { 
            optionTab: <PageTenderNew type={ETenderType.PURCHASE}/>,
            optionValue: String(SWITCH_SELECTOR__PURCHASE_TENDER__OPTION.value)
        },
    }
    return (
        <Wrapper1280>
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <WrapperLKPT pageTitle="Новый тендер" isButtonRight={false}
                             buttonBackProps={{href: DASHBOARD_PAGES.TENDERS(tenderType === ETenderTypeEn.PURCHASE).path}}
                             options={SWITCH_SELECTOR__TENDER__OPTIONS} optionsTab={OPTIONS_TAB}
                             currentKey={tenderType} />
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}
  