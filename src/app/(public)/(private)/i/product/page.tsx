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
    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
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

    return (
        <Wrapper1280>
            <WrapperAuth>
                <WrapperLKPT pageTitle="Мои товары" 
                             options={PRODUCT_PAGE_OPTIONS_ARRAY} optionsTab={MY_PRODUCTS_OPTIONS_TAB}
                             startPage={SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION} 
                             isButtonRight={false}/>
            </WrapperAuth>
        </Wrapper1280>
    )
}
