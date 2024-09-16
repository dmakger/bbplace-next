'use client'
import { useState } from "react";

import cl from './_LKTenderPage.module.scss'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { ETenderType, ETenderTypeEn } from "@/entities/Tender/model/tender.model";
import { IOptionTabTender } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { LKTenderTableAdaptive } from "@/entities/Tender/ui/TableAdaptive/LKTenderTableAdaptive";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import { SWITCH_SELECTOR__SALE_TENDER__OPTION, SWITCH_SELECTOR__PURCHASE_TENDER__OPTION, SWITCH_SELECTOR__TENDER__OPTIONS } from "@/shared/ui/SwitchSelector/data/tender.switchSelector.data";

export default function LKTenderPage() {
    // STATE
    const [tenderType, setTenderType] = useState<string | undefined>()

    const OPTIONS_TAB: IOptionTabTender = {
        sale: { 
            optionTab: <LKTenderTableAdaptive tenderType={ETenderTypeEn.SALE}/>, 
            optionValue: String(SWITCH_SELECTOR__SALE_TENDER__OPTION.value),
        },
        purchase: { 
            optionTab: <LKTenderTableAdaptive tenderType={ETenderTypeEn.PURCHASE}/>, 
            optionValue: String(SWITCH_SELECTOR__PURCHASE_TENDER__OPTION.value),
        },
    }
    return (
        <Wrapper1280>
            <SuspenseL.Tender searchKey={'type'} set={setTenderType}>
                <WrapperLKPT pageTitle={"Мои тендеры"} 
                             buttonBackProps={{href: DASHBOARD_PAGES.HOME.path}}
                             options={SWITCH_SELECTOR__TENDER__OPTIONS} optionsTab={OPTIONS_TAB}
                             currentKey={tenderType}  
                             isButtonRight={true} buttonRightProps={{href: DASHBOARD_PAGES.NEW_TENDER.path}}
                             classNamePage={cl.block}/>
            </SuspenseL.Tender>
        </Wrapper1280>
    );
}