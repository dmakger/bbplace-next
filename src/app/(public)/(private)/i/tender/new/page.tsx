'use client'

import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { IOption } from "@/shared/model/option.model";
import { Subblock } from "@/shared/ui/Subblock";
import SubblockChild from "@/shared/ui/Subblock/components/Child/SubblockChild";
import { SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION, SWITCH_SELECTOR_SALE_TENDERS_OPTION, TENDER_TYPE_OPTIONS } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { SuspenseL } from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";

export default function LKTenderNewPage() {
    return (
        <SuspenseL>
            <LKTenderNewChild />
        </SuspenseL>
    );
};

export const LKTenderNewChild: FC = () => {
    // ROUTER
    const searchParams = useSearchParams();

    // STATE
    const [selectedOption, setSelectedOption] = useState<IOption>(
        toTenderType(searchParams.get('type') as string) === ETenderType.PURCHASE 
        ? SWITCH_SELECTOR_PURCHASE_TENDERS_OPTION 
        : SWITCH_SELECTOR_SALE_TENDERS_OPTION
    )

    const adviceText = [
        'Вы можете сменить тип размещения, например, с покупки на продажу, в любой момент.',
        'Значения уже заполненных схожих полей сохранятся.',
    ];

    return (
        <Wrapper1280>
            <HeaderLKPT title={'Новый тендер'} 
                        selectedOption={selectedOption} setSelectedOption={setSelectedOption} 
                        options={TENDER_TYPE_OPTIONS} optionsTab={{}}
                        isButtonAdd={false} />
            <Subblock
                title="Совет"
                wModal={true}
                mobileButtonTitle='Совет'
                modalTitle="Совет"
                children={(
                    <SubblockChild.Text textList={adviceText} />
                )}
                // classNameBottomContainer={cl.bottomContainer}
            />
        </Wrapper1280>
    );
}
  