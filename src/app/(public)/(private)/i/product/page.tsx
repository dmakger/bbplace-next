"use client"

import { LKProductTableAdaptive } from "@/entities/Product/ui/TableAdaptive/LKProductTableAdaptive";
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { LKPTPage } from "@/features/LKPTPage";
import { IOption } from "@/shared/model/option.model";
import { SwitchSelector } from "@/shared/ui/SwitchSelector";
import { ProductsTypeLK, SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION, SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';
import { useState } from "react";

export default function LKProductPage() {

    // STATE
    const [selectedOption, setSelectedOption] = useState<IOption>(SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION)     


    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        // active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, optionQuantity: 22 },
        // drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, optionQuantity: 3 },
        // woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, optionQuantity: 0 },
        active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/> },
        drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/> },
        woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/> },
    }

    return (
        <Wrapper1280>
            <WrapperAuth>
                <HeaderLKPT title={'Мои товары'} selectedOption={selectedOption} 
                            options={[
                                SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, 
                                SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, 
                                SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
                            ]}
                            setSelectedOption={setSelectedOption} optionsTab={MY_PRODUCTS_OPTIONS_TAB} />
                <LKPTPage optionsTab={MY_PRODUCTS_OPTIONS_TAB} selectedOption={selectedOption} />
            </WrapperAuth>
        </Wrapper1280>
    )
}
