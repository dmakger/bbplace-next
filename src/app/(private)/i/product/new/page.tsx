import { ICreateNewProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { TabPage } from "@/features/TabPage";
import { ETabPageVariant } from "@/features/TabPage/model/tabPage.model";
import { LK_PRODUCT_PAGE_CREATE, SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE, SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import { ProductSingleCreationPage } from "@/widgets/Pages/LK/ProductSingleCreationPage";


export default function ProductNewPage() {

    const instructionText: string[] = [
        '1. Сгенерируйте и скачайте шаблон.',
        'Для генерации добавьте одну или несколько категорий, выбирая раздел, подраздел и иногда подподраздел.',
        '2. Наполните шаблон товарами и загрузите получившуюся таблицу.',
        'Новые товары будут находится в разделе «Черновики». Чтобы перевести товары в раздел «Активные» добавьте к ним фотографии.'
    ]

    const PRODUCT_NEW_PAGE_OPTIONS_TAB: ICreateNewProductsTab = {
        multiple: {
            optionTab:
                <TabPage instructionText={instructionText} variant={ETabPageVariant.MULTIPLE_CREATION} />,
                optionValue: String(SWITCH_SELECTOR_PRODUCT_PAGE_MULTIPLE.value)
        },
        single: {
            optionTab: <ProductSingleCreationPage />,
            optionValue:  String(SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE.value)
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