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


    const RATING_SUPPLIER_DATA = {heading: 'Рейтинг', body: <Rating rating={supplierRating} numberOfReviews={supplierReviews} color={ERatingColor.DEFAULT}/>} ;
    const COUNTRY_SUPPLIER_DATA = {heading: 'Регион', body: supplier?.country ?? ''}
    const ABOUT_SUPPLIER_DATA = {heading: 'О поставщике', body: supplier?.shortDescription || supplier?.description || ''};
    const REGISTRATION_DATE_SUPPLIER_DATA = {heading: 'Регистрация', body: supplier?.shortDescription || supplier?.description || ''};
    const TYPE_OF_BUSINESS_SUPPLIER_DATA = {heading: 'Тип бизнеса', body: supplier?.shortDescription || supplier?.description || ''};
    const RESPONSE_VELOCITY_SUPPLIER_DATA = {heading: 'Скорость ответа', body: <>3 дня</>};

    let processData: IHeadingToText[] = []

    if(variant === IGetDataHeadingToTextSupplierTableVariant.PRODUCT_PAGE)
        processData = [
        COUNTRY_SUPPLIER_DATA,
        TYPE_OF_BUSINESS_SUPPLIER_DATA,
        REGISTRATION_DATE_SUPPLIER_DATA,
        RESPONSE_VELOCITY_SUPPLIER_DATA
    ]

    if(variant === IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE)
        processData = [
        RATING_SUPPLIER_DATA ,
        ...(isCountryNeeded ? [COUNTRY_SUPPLIER_DATA] : []),
        ABOUT_SUPPLIER_DATA
    ]



    return processData
            .map(it => getHeadingToText(it.heading, it.body))
            .filter(it => it !== undefined) as IHeadingToText[]
}