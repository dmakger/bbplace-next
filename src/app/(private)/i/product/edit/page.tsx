"use client"

import { IEditProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { LK_PRODUCT_PAGE_EDIT, SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { ProductSingleCreationPage } from "@/widgets/Pages/LK/ProductSingleCreationPage";
import { useState, Suspense } from "react";

export default function ProductEditPage() {
    // STATE
    const [groupId, setGroupId] = useState<string | undefined>()
    const [productId, setProductId] = useState<string | undefined>()


    const PRODUCT_EDIT_OPTIONS_TAB: IEditProductsTab = {
        single: {
            optionTab: <ProductSingleCreationPage groupId={groupId} productId={productId} />,
            optionValue: String(SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE.value)
        }
    }
    return (
        <Wrapper1280>
            <Suspense fallback={<div>Loading...</div>}>
                <SuspenseL.Any data={[
                    { searchKey: "groupId", set: setGroupId, defaultValue: undefined },
                    { searchKey: "id", set: setProductId, defaultValue: undefined },
                ]}>
                    <WrapperLKPT options={LK_PRODUCT_PAGE_EDIT}
                        pageTitle="Новый товар"
                        startPage={SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE}
                        optionsTab={PRODUCT_EDIT_OPTIONS_TAB}
                        isButtonAdd={false} />
                </SuspenseL.Any>
            </Suspense>
        </Wrapper1280>
    )
}
