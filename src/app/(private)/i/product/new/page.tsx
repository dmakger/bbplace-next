import { ICreateNewProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { LK_PRODUCT_PAGE_CREATE, SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import { ProductMultipleCreationPage } from "@/widgets/Pages/LK/ProductMultipleCreationPage";


export default function ProductNewPage() {

    const PRODUCT_NEW_PAGE_OPTIONS_TAB: ICreateNewProductsTab = {
        multiple: {
            optionTab:
                <ProductMultipleCreationPage />
        },
        single: {
            optionTab: <>dsadasdasd</>
        }
    }
    return (
        <Wrapper1280>
            <WrapperLKPT options={LK_PRODUCT_PAGE_CREATE}
                pageTitle="Новый товар"
                startPage={SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE}
                optionsTab={PRODUCT_NEW_PAGE_OPTIONS_TAB}
                isButtonAdd={false} />
        </Wrapper1280>
    )
}