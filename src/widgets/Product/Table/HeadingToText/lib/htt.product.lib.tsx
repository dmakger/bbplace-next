import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { ISize } from "@/entities/Metrics/model/size.metrics.model";
import { SEX_OPTIONS } from "@/entities/Product/data/product.data";
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

export const getGender = (product: IProduct) => {
    const gender = product.characteristics.gender;
    const genderId = parseInt(gender);
    if (!isNaN(genderId)) {
        return SEX_OPTIONS.find(it => it.id === genderId)?.name;
    }
    return gender;
}

export const getCountry = (product: IProduct, countries: ICountry[]) => {
    const country = product.characteristics.country;
    const countryId = parseInt(country)
    if(!isNaN(countryId)){
        return countries.find(it => it.id === countryId)?.name
    }
    return country;
}


export const getDataHeadingToTextProductMainTable = (product: IProduct, selectedCountry: string, selectedWeightUnit: string) => {

    const vat = product.vat ? 'Облагается' : 'Не облагается'
    const certification = product.certification ? 'Да' : 'Нет'
    const testProbe = product.isHasTestProbe ? 'Да' : 'Нет'
    const customDesign = product.isCustomDesign ? 'Да' : 'Нет'
    const packageSizes = `${product.packagingHeight} x ${product.packagingWidth} x ${product.packagingLength}`
    const productWeight = `${product.characteristics.weight} ${selectedWeightUnit}`
    

    const processData = [
        {heading: 'Доставка', body: product.delivery},
        {heading: 'Условия оплаты', body: product.paymentConditions},
        {heading: 'Срок изготовления', body: product.deliveryTime},
        {heading: 'Тип упаковки', body: product.packageType},
        {heading: 'Размеры упаковки', body: packageSizes},
        {heading: 'Вес товара', body: productWeight},
        {heading: 'НДС', body: vat},
        {heading: 'Сертификация', body: certification},
        {heading: 'Тестовый пробник', body: testProbe},
        {heading: 'Индивидуальный дизайн', body: customDesign},
        {heading: 'Статус товара', body: product.status},
        {heading: 'Склады по городам', body: product.warehouses},
        {heading: 'Бренд', body: product.characteristics.brand},
        {heading: 'Страна', body: selectedCountry},
        {heading: 'Срок годности', body: product.characteristics.expirationDate},
        {heading: 'Пол', body: getGender(product)},
        {heading: 'Особенности', body: product.characteristics.features},
        {heading: 'Состав', body: product.characteristics.composition},
        {heading: 'Комплектация', body: product.characteristics.equipment},
    ]

    return processData.map(it => {
        const body = Array.isArray(it.body) ? it.body.map((subIt: ISize | string) => typeof subIt === 'object'  ? `${subIt.size} (${subIt.sizeUnit.name})` : subIt).join(', ') : it.body;
        return getHeadingToText(it.heading, body);
    }).filter(item => item !== undefined) as IHeadingToText[];
}