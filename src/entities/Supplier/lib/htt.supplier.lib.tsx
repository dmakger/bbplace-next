import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IGetDataHeadingToTextSupplierTable, IHeadingToText } from "@/shared/model/text.model";
import { Rating } from "@/shared/ui/Rating";


export const getDataHeadingToTextSupplierTable = ({
    supplier,
    supplierRating,
    supplierReviews,
    isCountryNeeded = false
}: IGetDataHeadingToTextSupplierTable) => {


    const RATING_SUPPLIER_DATA = {heading: 'Рейтинг', body: <Rating rating={supplierRating} numberOfReviews={supplierReviews}/>};
    const COUNTRY_SUPPLIER_DATA = {heading: 'Регион', body: supplier?.country ?? ''}
    const ABOUT_SUPPLIER_DATA = {heading: 'О поставщике', body: supplier?.shortDescription || supplier?.description || ''};

    const processData: IHeadingToText[] = [
        RATING_SUPPLIER_DATA ,
        ...(isCountryNeeded ? [COUNTRY_SUPPLIER_DATA] : []),
        ABOUT_SUPPLIER_DATA,
    ]

    return processData
            .map(it => getHeadingToText(it.heading, it.body))
            .filter(it => it !== undefined) as IHeadingToText[]
}