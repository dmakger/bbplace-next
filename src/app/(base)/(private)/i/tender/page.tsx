'use client'
import { useState } from "react";

import cl from './_LKTenderPage.module.scss'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { LKTenderTableAdaptive } from "@/entities/Tender/ui/TableAdaptive/LKTenderTableAdaptive";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";

export default function LKTenderPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { 
            optionTab: <LKTenderTableAdaptive tenderType={ETenderType.SALE}/>, 
            optionValue: String(SWITCH_SELECTOR_SALE_TENDERS_OPTION.value),
        },
        purchase: { 
            optionTab: <LKTenderTableAdaptive tenderType={ETenderType.PURCHASE}/>, 
            optionValue: String(SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION.value),
        },
    }
    return (
        <Wrapper1280>
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <WrapperLKPT pageTitle={"Мои тендеры"} 
                             buttonBackProps={{href: DASHBOARD_PAGES.HOME.path}}
                             options={TENDER_TYPE_OPTIONS} optionsTab={OPTIONS_TAB}
                             startPage={tenderType === ETenderType.PURCHASE ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION : SWITCH_SELECTOR_SALE_TENDERS_OPTION} 
                             isButtonRight={true} buttonRightProps={{href: DASHBOARD_PAGES.NEW_TENDER.path}}
                             classNamePage={cl.block}/>
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}