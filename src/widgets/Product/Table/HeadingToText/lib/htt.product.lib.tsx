import { IProduct } from "@/entities/Product/model/product.model";
import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IHeadingToText } from "@/shared/model/text.model";

export const getDataHeadingToTextProductTable = (product: IProduct) => {
    const warehouses = product.warehouses ? 'Есть на складе' : 'Нет'
    const processData = [
        {heading: 'Страна изготовитель', body: product.country},
        {heading: 'Статус', body: product.status},
        {heading: 'Склад', body: warehouses},
        {heading: 'Описание', body: product.characteristics.description},
    ]
    return processData
            .map(it => (getHeadingToText(it.heading, it.body)))
            .filter(it => it !== undefined) as IHeadingToText[]

}