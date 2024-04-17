import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { ISupplier } from "../model/supplier.model";
import { IHeadingToText } from "@/shared/model/text.model";

export const getDataHeadingToTextSupplierTable = (supplier: ISupplier) => {
   
    const processData = [
        {heading: 'Рейтинг', body: supplier.email},
        {heading: 'Регион', body: supplier.country},
        {heading: 'О поставщике', body: supplier.shortDescription || supplier.description},
    ]

    return processData
            .map(it => (getHeadingToText(it.heading, it.body)))
            .filter(it => it !== undefined) as IHeadingToText[]
}