"use client"

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { EProductType } from "@/entities/Product/data/type.product.data";
import { toProductType } from "@/entities/Product/lib/type.product.lib";
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
    const [typeProduct, setTypeProduct] = useState<string | undefined>()


    const PRODUCT_EDIT_OPTIONS_TAB: IEditProductsTab = {
        single: {
            optionTab: <ProductSingleCreationPage isDraft={toProductType(typeProduct) === EProductType.Draft} groupId={groupId} productId={productId} />,
            optionValue: String(SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE.value)
        }
    }
    return (
        <Wrapper1280>
            <SuspenseL>
                <SuspenseL.Any data={[
                    { searchKey: "groupId", set: setGroupId },
                    { searchKey: "id", set: setProductId },
                    { searchKey: "type", set: setTypeProduct },
                ]}>
                    <WrapperLKPT options={LK_PRODUCT_PAGE_EDIT}
                        pageTitle="Новый товар"
                        buttonBackProps={{href: DASHBOARD_PAGES.PRODUCTS.path}}
                        startPage={SWITCH_SELECTOR_PRODUCT_EDIT_PAGE_SINGLE}
                        optionsTab={PRODUCT_EDIT_OPTIONS_TAB}
                        isButtonRight={false} />
                </SuspenseL.Any>
            </SuspenseL>
        </Wrapper1280>
    )
}
