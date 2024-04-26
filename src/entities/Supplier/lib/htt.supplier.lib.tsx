import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { ISupplier } from "../model/supplier.model";
import { IHeadingToText } from "@/shared/model/text.model";
import { ReactNode } from "react";
import { Rating } from "@/shared/ui/Rating";

interface processData{
    heading: string,
    body: string | ReactNode
}


export const getDataHeadingToTextSupplierTable = (supplier: ISupplier, supplierRating: number, supplierReviews: number) => {

    const processData: processData[] = [
        {heading: 'Рейтинг', body: <Rating rating={supplierRating} numberOfReviews={supplierReviews} linkHref={''} />} ,
        {heading: 'Регион', body: supplier.country},
        {heading: 'О поставщике', body: supplier.shortDescription || supplier.description},
    ]

    return processData
            .map(it => getHeadingToText(it.heading, it.body))
            .filter(it => it !== undefined) as IHeadingToText[]
}