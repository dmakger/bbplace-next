"use client"

import { LKProductTableAdaptive } from "@/entities/Product/ui/TableAdaptive/LKProductTableAdaptive";
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { IOption } from "@/shared/model/option.model";
import { PRODUCT_PAGE_OPTIONS_ARRAY, ProductsTypeLK, SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import { useState } from "react";

export default function LKProductPage() {

    // STATE
    const [selectedOption, setSelectedOption] = useState<IOption>(SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION)     


    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        // active: { optionTab: <>Lorem</>, optionQuantity: 22 },
        // drafts: { optionTab: <>dddddd</>, optionQuantity: 3 },
        // woPrice: { optionTab: <>ddddwwww</>, optionQuantity: 0 },
        // active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, optionQuantity: 22 },
        // drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, optionQuantity: 3 },
        // woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, optionQuantity: 0 },
        active: { 
            optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, 
            optionValue: String(SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION.value) 
        },
        drafts: { 
            optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, 
            optionValue: String(SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION.value) 
        },
        woPrice: { 
            optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, 
            optionValue: String(SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION.value) 
        },
    }

    // const productsUserLK: IUserProductsTab = {
    //     active: undefined,
    //     drafts: undefined
    // }

    return (
        <Wrapper1280>
            <WrapperAuth>
                {/* <HeaderLKPT title={'Мои товары'} selectedOption={selectedOption} 
                            options={[
                                SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, 
                                SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, 
                                SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
                            ]}
                            setSelectedOption={setSelectedOption} optionsTab={MY_PRODUCTS_OPTIONS_TAB} />
                <LKPTPage optionsTab={[]} selectedOption={selectedOption} /> */}
                <WrapperLKPT pageTitle="Мои товары" options={PRODUCT_PAGE_OPTIONS_ARRAY} optionsTab={MY_PRODUCTS_OPTIONS_TAB}
                startPage={SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION} isButtonAdd={false}/>
                {/* <HeaderLKPT title={""} selectedOption={undefined} setSelectedOption={undefined} optionsTab={undefined} /> */}
                {/* <SwitchSelector options={[]} selectedOption={undefined} setSelectedOption={undefined}> */}
                    {/* <LKProductTableAdaptive /> */}
                {/* </SwitchSelector> */}
            </WrapperAuth>
        </Wrapper1280>
    )
}
