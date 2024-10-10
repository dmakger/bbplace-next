import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IGetDataHeadingToTextSupplierTable, IGetDataHeadingToTextSupplierTableVariant, IHeadingToText } from "@/shared/model/text.model";
import { Rating } from "@/shared/ui/Rating";
import { ERatingColor } from "../../Rating/model/rating.model";


export const getDataHeadingToTextSupplierTable = ({
    variant = IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE,
    supplier,
    supplierRating,
    supplierReviews,
    isCountryNeeded = false
}: IGetDataHeadingToTextSupplierTable) => {
    

    //DEMO
    const RESPONSE_VELOCITY_SUPPLIER_DATA = {heading: 'Скорость ответа', body: <>~ 3 дня</>};
    const REGISTRATION_DATE_SUPPLIER_DATA = {heading: 'Дата регистрации', body: supplier?.shortDescription || supplier?.description || '22'};
    const TYPE_OF_BUSINESS_DATA = {heading: 'Тип бизнеса', body: 'Не указан'}
    const TIN_DATA = {heading: 'ИНН', body: supplier?.inn ?? ''}
    const CATEGORIES_DATA = {heading: 'Категории', body: supplier?.category ?? 'Не указаны'}
    const BRAND_NAME_DATA = {heading: 'Бренд', body: supplier?.country ?? ''}

    const ADDRESS_DATA = {heading: 'Адрес Общий', body: supplier?.country ?? ''}
    const DESCRIPTION_DATA = {heading: 'Описание', body: supplier?.description ?? supplier?.shortDescription ?? 'Не указано'}



    //BUSINESS_PREMIUM
    const ESTABLISHMENT_YEAR_DATA = {heading: 'Год основания', body: supplier?.country ?? ''}
    const PRODUCTION_FACILITIES_DATA = {heading: 'Производственные мощности', body: supplier?.country ?? ''}

    //PREMIUM
    const PRESENСE_MARKETS_DATA =  {heading: 'Рынки присутствия', body: supplier?.country ?? ''}





    const RATING_SUPPLIER_DATA = {heading: 'Рейтинг', body: <Rating rating={supplierRating} numberOfReviews={supplierReviews} color={ERatingColor.DEFAULT}/>} ;
    const COUNTRY_SUPPLIER_DATA = {heading: 'Страна', body: supplier?.country ?? ''}
    const ABOUT_SUPPLIER_DATA = {heading: 'О поставщике', body: supplier?.shortDescription || supplier?.description || ''};

    let processData: IHeadingToText[] = []

    if(variant === IGetDataHeadingToTextSupplierTableVariant.PRODUCT_PAGE)
        processData = [
        COUNTRY_SUPPLIER_DATA,
        // TYPE_OF_BUSINESS_SUPPLIER_DATA,
        REGISTRATION_DATE_SUPPLIER_DATA,
        RESPONSE_VELOCITY_SUPPLIER_DATA
    ]

    if(variant === IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_ITEM)
        processData = [
        RATING_SUPPLIER_DATA ,
        ...(isCountryNeeded ? [COUNTRY_SUPPLIER_DATA] : []),
        ABOUT_SUPPLIER_DATA
    ]



    return processData
            .map(it => getHeadingToText(it.heading, it.body))
            .filter(it => it !== undefined) as IHeadingToText[]
}