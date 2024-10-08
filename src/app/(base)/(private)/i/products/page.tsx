"use client"
import cl from './_LKProductPage.module.scss'
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { LKProductTableAdaptive } from "@/entities/Product/ui/TableAdaptive/LKProductTableAdaptive";
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { PRODUCT_PAGE_OPTIONS_ARRAY, ProductsTypeLK, SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { Suspense, useState } from "react";

export default function LKProductPage() {
    // STATE
    const [typeProduct, setTypeProduct] = useState<string | undefined>()

    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        [ProductsTypeLK.Active]: { 
            optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, 
            optionValue: String(SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION.value) 
        },
        [ProductsTypeLK.Draft]: { 
            optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, 
            optionValue: String(SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION.value) 
        },
        // [ProductsTypeLK.WithoutPrice]: { 
        //     optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, 
        //     optionValue: String(SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION.value) 
        // },
    }

    return (
        <Wrapper1280>
            <SuspenseL>
                <SuspenseL.Any data={[
                    { searchKey: "type", set: setTypeProduct },
                ]}>
                    <WrapperLKPT pageTitle="Мои товары" 
                                options={PRODUCT_PAGE_OPTIONS_ARRAY} optionsTab={MY_PRODUCTS_OPTIONS_TAB}
                                startPage={PRODUCT_PAGE_OPTIONS_ARRAY.find(it => it.value === typeProduct) ?? SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION} 
                                classNamePage={cl.LKProductPage}
                                isButtonRight={true} buttonRightProps={{href: DASHBOARD_PAGES.NEW_PRODUCT.path}} />
                </SuspenseL.Any>
            </SuspenseL>
        </Wrapper1280>
    )
}
