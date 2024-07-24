'use client'
import { useState } from "react";

import cl from './_LKTenderPage.module.scss'
import { IOption } from "@/shared/model/option.model";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { LKPTPage } from "@/features/LKPTPage";
import { LKTenderTableAdaptive } from "@/entities/Tender/ui/TableAdaptive/LKTenderTableAdaptive";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function LKTenderPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()
    const [selectedOption, setSelectedOption] = useState<IOption>(
        tenderType === ETenderType.PURCHASE 
        ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION 
        : SWITCH_SELECTOR_SALE_TENDERS_OPTION
    )

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { optionTab: <LKTenderTableAdaptive tenderType={ETenderType.SALE}/> },
        purchase: { optionTab: <LKTenderTableAdaptive tenderType={ETenderType.PURCHASE}/> },
    }
    return (
        <Wrapper1280>
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <HeaderLKPT title={'Новый тендер'} 
                            buttonBackProps={{href: DASHBOARD_PAGES.HOME.path}}
                            selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
                            options={TENDER_TYPE_OPTIONS} optionsTab={{}}
                            isButtonAdd={true} buttonAddProps={{href: DASHBOARD_PAGES.NEW_TENDER.path}} />
                <LKPTPage optionsTab={OPTIONS_TAB} selectedOption={selectedOption} className={cl.block} />
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}