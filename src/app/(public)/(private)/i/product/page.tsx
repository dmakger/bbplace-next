"use client"

import { LKProductTableAdaptive } from "@/entities/Product/ui/TableAdaptive/LKProductTableAdaptive";
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { HeaderLKPT } from "@/features/Headers/HeaderLK";
import { LKPTPage } from "@/features/LKPTPage";
import { IOption } from "@/shared/model/option.model";
import { PRODUCT_PAGE_OPTIONS_ARRAY, ProductsTypeLK, SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';
import { useState } from "react";

export default function LKProductPage() {

    // STATE
    const [selectedoption, setselectedoption] = useState<IOption>(SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION)     


    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        // active: { optionTab: <>Lorem</>, optionQuantity: 22 },
        // drafts: { optionTab: <>dddddd</>, optionQuantity: 3 },
        // woPrice: { optionTab: <>ddddwwww</>, optionQuantity: 0 },
        // active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/>, optionQuantity: 22 },
        // drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/>, optionQuantity: 3 },
        // woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/>, optionQuantity: 0 },
        active: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Active}/> },
        drafts: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.Draft}/> },
        woPrice: { optionTab: <LKProductTableAdaptive typeProduct={ProductsTypeLK.WithoutPrice}/> },
    }

    // const productsUserLK: IUserProductsTab = {
    //     active: undefined,
    //     drafts: undefined
    // }

    return (
        <Wrapper1280>
            <WrapperAuth>
                <HeaderLKPT title={'Мои товары'} selectedoption={selectedoption} setselectedoption={setselectedoption} optionsTab={MY_PRODUCTS_OPTIONS_TAB} options={PRODUCT_PAGE_OPTIONS_ARRAY}/>
                <LKPTPage optionsTab={MY_PRODUCTS_OPTIONS_TAB} selectedoption={selectedoption} />
                {/* <HeaderLKPT title={""} selectedoption={undefined} setselectedoption={undefined} optionsTab={undefined} /> */}
                {/* <SwitchSelector options={[]} selectedoption={undefined} setselectedoption={undefined}> */}
                    {/* <LKProductTableAdaptive /> */}
                {/* </SwitchSelector> */}
            </WrapperAuth>
        </Wrapper1280>
    )
}
