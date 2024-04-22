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

export const getDataHeadingToTextProductMainTable = (product: IProduct) => {

    const vat = product.vat ? 'Облагается' : 'Не облагается' 
    const certification = product.certification ? 'Да' : 'Нет'
    const testProbe = product.isHasTestProbe ? 'Да' : 'Нет'
    const customDesign = product.isCustomDesign ? 'Да' : 'Нет'

    const processData = [
        {heading: 'Доставка', body: product.delivery},
        {heading: 'Условия оплаты', body: product.paymentConditions},
        {heading: 'Срок изготовления', body: product.deliveryTime},
        {heading: 'Тип упаковки', body: product.packageType},
        {heading: 'Размеры товара', body: product.media.sizes},
        {heading: 'НДС', body: vat},
        {heading: 'Сертификация', body: certification},
        {heading: 'Тестовый пробник', body: testProbe},
        {heading: 'Индивидуальный дизайн', body: customDesign},
        {heading: 'Статус товара', body: product.status},
        {heading: 'Склады по городам', body: product.warehouses},
        {heading: 'Бренд', body: product.characteristics.brand},
        {heading: 'Страна', body: product.country},
        {heading: 'Срок годности', body: product.characteristics.expirationDate},
        {heading: 'Особенности', body: product.characteristics.features},
        {heading: 'Состав', body: product.characteristics.composition},
        {heading: 'Комплектация', body: product.characteristics.equipment},
    ]

    return processData
    .map(it => {
            if (Array.isArray(it.body) && it.body.length > 0) {
                return getHeadingToText(it.heading, it.body.join(', '))
            } else if(typeof(it.body) !== 'object'){             
                return getHeadingToText(it.heading, it.body)
            }   
    })
    .filter(it => it !== undefined) as IHeadingToText[]
}