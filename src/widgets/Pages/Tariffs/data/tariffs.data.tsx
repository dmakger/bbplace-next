import { XMARK_CAPTION_ICON } from "@/shared/ui/Icon/data/xmark.data.icon"
import { ITTCellButtonItem, ITTBodyRowData, ITariffsInfo, ETTVariants, ITTBodyRow, ITTMobileData } from "../model/tariffs.model"
import { CHECKBOX_FONT_ICON } from "@/shared/ui/Icon/data/checkbox.data.icon"
import { INFINITY_FONT_ICON } from "@/shared/ui/Icon/data/infinity.data.icon"
import { MINUS_CAPTION_ICON } from "@/shared/ui/Icon/data/minus.data.icon"

//TARIFFS_INFO

export const DEMO_TARIFF_INFO: ITariffsInfo = {
    name: ETTVariants.DEMO,
    rowId: 3
}

export const BUSINESS_TARIFF_INFO: ITariffsInfo = {
    name: ETTVariants.BUSINESS,
    rowId: 2
}

export const PREMIUM_TARIFF_INFO: ITariffsInfo = {
    name: ETTVariants.PREMIUM,
    rowId: 1
}

export const TARIFFS_INFO_ARRAY: ITariffsInfo[] = [
    DEMO_TARIFF_INFO,
    BUSINESS_TARIFF_INFO,
    PREMIUM_TARIFF_INFO
]

//BUTTONS_INFO

export const DEFAULT_SPACE_FOR_BUTTON_ITEM_INFO: ITTCellButtonItem = {
    classNameData: 'firstDefaultItem'
}

export const DEMO_BUTTON_INFO: ITTCellButtonItem = {
    title: 'Демо',
    buttonTitle: ' Бесплатно',
    variant: ETTVariants.DEMO,
    rowId: DEMO_TARIFF_INFO.rowId
}

export const BUSINESS_BUTTON_INFO: ITTCellButtonItem = {
    title: 'Бизнес',
    buttonTitle: ' от 2 090₽/месяц',
    variant: ETTVariants.BUSINESS,
    rowId: BUSINESS_TARIFF_INFO.rowId
}

export const PREMIUM_BUTTON_INFO: ITTCellButtonItem = {
    title: 'Премиум',
    buttonTitle: 'от 2 890₽/месяц',
    variant: ETTVariants.PREMIUM,
    rowId: PREMIUM_TARIFF_INFO.rowId
}

export const BUTTONS_INFO_ARRAY: ITTCellButtonItem[] = [
    DEFAULT_SPACE_FOR_BUTTON_ITEM_INFO,
    DEMO_BUTTON_INFO,
    BUSINESS_BUTTON_INFO,
    PREMIUM_BUTTON_INFO
]

//MOBILE_CONFIGS
export const MOBILE_TT_BODY_DATA: ITTMobileData[] = [
    {
        isPremium: true,
        rowId: PREMIUM_TARIFF_INFO.rowId,
        buttonInfo: PREMIUM_BUTTON_INFO,
    },
    {
        isBusiness: true,
        rowId: BUSINESS_TARIFF_INFO.rowId,
        buttonInfo: BUSINESS_BUTTON_INFO,
    },
    {
        isDemo: true,
        rowId: DEMO_TARIFF_INFO.rowId,
        buttonInfo: DEMO_BUTTON_INFO,
    }
];

//ROWS_DATA
export const LIMIT_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Лимит по предложениям для заказчиков', classNameData: 'firstLeftEl' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO, classNameData: 'firstRightEl' },
    business: { iconSrc: INFINITY_FONT_ICON.default, variant: ETTVariants.BUSINESS, classNameData: 'firstRightEl' },
    premium: { iconSrc: INFINITY_FONT_ICON.default, variant: ETTVariants.PREMIUM, classNameData: 'firstRightEl' },
}

export const PRIORITY_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Приоритет при показе в каталоге' },
    demo: { title: '5 месяцев', variant: ETTVariants.DEMO },
    business: { iconSrc: INFINITY_FONT_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: INFINITY_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PRODUCT_NUMBER_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Количество товаров' },
    demo: { title: '3', variant: ETTVariants.DEMO },
    business: { title: '500', variant: ETTVariants.BUSINESS },
    premium: { iconSrc: INFINITY_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PHONE_N_EMAIL_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Телефон и почта компании на странице поставщика и товаров' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const INDEXATION_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Индексация поисковыми системами' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PRODUCTS_W_SEO_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Товаров с SEO оптимизацией' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { title: '3', variant: ETTVariants.BUSINESS },
    premium: { title: '10/20/30*', variant: ETTVariants.PREMIUM }
}

export const AD_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Привлечение клиентов через контекстную рекламу' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PREMIUM_SUPPORT_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Премиум поддержка' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const ACCESS_TO_CONTACTS_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Доступ к контактам оптовых заказчиков' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const TENDERS_AUTOFIT_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Автоподбор актуальных заявок' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PUBLIC_PROFILE_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Публикация профиля в каталоге' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const PREMIUM_SIGN_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Премиум значок' },
    demo: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.DEMO },
    business: { iconSrc: XMARK_CAPTION_ICON.default, variant: ETTVariants.BUSINESS },
    premium: { iconSrc: CHECKBOX_FONT_ICON.default, variant: ETTVariants.PREMIUM }
}

export const NOTE_DESCRIPTION_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: ' Чем дольше партнёрство, тем выгоднее условия!', subtitle: '* — зависит от продолжительности тарифа', classNameData: 'rowCell'}
}

export const PARTNERSHIP_FOR_3_M_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Партнёрство на 3 месяца', classNameData: 'noForDemo' },
    demo: { iconSrc: MINUS_CAPTION_ICON.default, variant: ETTVariants.DEMO, classNameData: 'noForDemo' },
    business: { title: '7 470₽', subtitle: '2 490₽/месяц', variant: ETTVariants.BUSINESS },
    premium: { title: '10 470₽', subtitle: '3 490₽/месяц', variant: ETTVariants.PREMIUM }
}

export const PARTNERSHIP_FOR_6_M_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Партнёрство на 6 месяцев', classNameData: 'noForDemo' },
    demo: { iconSrc: MINUS_CAPTION_ICON.default, variant: ETTVariants.DEMO, classNameData: 'noForDemo' },
    business: { title: '13 740₽', subtitle: '2 290₽/месяц', variant: ETTVariants.BUSINESS },
    premium: { title: '19 140₽', subtitle: '3 190₽/месяц', variant: ETTVariants.PREMIUM }
}

export const PARTNERSHIP_FOR_9_M_TT_BODY_ROW_DATA: ITTBodyRowData = {
    default: { title: 'Партнёрство на 9 месяцев', classNameData: 'lastLeftEl' },
    demo: { iconSrc: MINUS_CAPTION_ICON.default, variant: ETTVariants.DEMO, classNameData: 'noForDemo' },
    business: { title: '25 080₽', subtitle: '2 090₽/месяц', variant: ETTVariants.BUSINESS },
    premium: { title: '34 680₽', subtitle: '2 890₽/месяц', variant: ETTVariants.PREMIUM, classNameData: 'lastRightEl' }
}


export const TT_BODY_ROW_DATA_ARRAY: ITTBodyRowData[] = [
    LIMIT_TT_BODY_ROW_DATA,
    PRIORITY_TT_BODY_ROW_DATA,
    PRODUCT_NUMBER_TT_BODY_ROW_DATA,
    PHONE_N_EMAIL_TT_BODY_ROW_DATA,
    INDEXATION_TT_BODY_ROW_DATA,
    PRODUCTS_W_SEO_TT_BODY_ROW_DATA,
    AD_TT_BODY_ROW_DATA,
    PREMIUM_SUPPORT_TT_BODY_ROW_DATA,
    ACCESS_TO_CONTACTS_TT_BODY_ROW_DATA,
    TENDERS_AUTOFIT_TT_BODY_ROW_DATA,
    PUBLIC_PROFILE_TT_BODY_ROW_DATA,
    PREMIUM_SIGN_TT_BODY_ROW_DATA,

    NOTE_DESCRIPTION_TT_BODY_ROW_DATA,

    PARTNERSHIP_FOR_3_M_TT_BODY_ROW_DATA,
    PARTNERSHIP_FOR_6_M_TT_BODY_ROW_DATA,
    PARTNERSHIP_FOR_9_M_TT_BODY_ROW_DATA
]