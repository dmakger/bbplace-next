import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { SEX_OPTIONS } from "@/entities/Product/data/product.data";
import { IProduct } from "@/entities/Product/model/product.model";
import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IOption } from "@/shared/model/option.model";
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

//1. проверяем, что пришло в characteristic: id элемента (number) или name элемента (string)
//2. если characteristic оказался number, то мы в list ищем по it соответствующий элемент
//3. если characteristic оказался string, то возвращаем characteristic

export const getCharacteristic = (characteristic: string, list: ICountry[] | IOption[]) => {
    const characteristicId = parseInt(characteristic)
    if(!isNaN(characteristicId)){
        return list.find(it => it.id === characteristicId)?.name
    }
    return characteristic;
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
        {heading: 'Пол', body: getCharacteristic(product.characteristics.gender, SEX_OPTIONS)},
        {heading: 'Особенности', body: product.characteristics.features},
        {heading: 'Состав', body: product.characteristics.composition},
        {heading: 'Комплектация', body: product.characteristics.equipment},
    ]

    //1. если it.body - массив строк, то формируем из этого массива строку с элементами, разделенными запятой
    //2. если it.body - строка, возвращаем строку
    //3. в массиве [processData] избавляемся от элементом равных undefined
    return processData.map(it => {
        const body = Array.isArray(it.body) ? it.body.join(', ') : it.body;
        return getHeadingToText(it.heading, body);
    }).filter(item => item !== undefined) as IHeadingToText[];
}