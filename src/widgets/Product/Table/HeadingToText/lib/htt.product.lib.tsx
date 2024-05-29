import { SEX_OPTIONS } from "@/entities/Product/data/product.data";
import { getDate } from "@/shared/lib/dateTime.lib";
import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IHeadingToText } from "@/shared/model/text.model";
import { Rating } from "@/shared/ui/Rating";
import { IGetCharacteristic, IGetDataHeadingToTextProductMainTable, IGetDataHeadingToTextProductTable } from "../model/htt.product.model";

export const getDataHeadingToTextProductTable = ({ product, isCreatedAtAndReviews, itemRating, itemReviews }: IGetDataHeadingToTextProductTable) => {
    const warehouses = product.warehouses ? 'Есть на складе' : 'Нет'

    const createdAt = product.createdAt

    const COUNTRY_PRODUCT_DATA: IHeadingToText = { heading: 'Страна изготовитель', body: product.country ?? '' }
    const STATUS_PRODUCT_DATA: IHeadingToText = { heading: 'Статус', body: product.status ?? '' }
    const WAREHOUSES_PRODUCT_DATA: IHeadingToText = { heading: 'Склад', body: warehouses }
    const DESCRIPTION_PRODUCT_DATA: IHeadingToText = { heading: 'Описание', body: product.characteristics.description }

    const CREATED_AT_PRODUCT_DATA: IHeadingToText = { heading: 'От', body: getDate(createdAt) }
    const REVIEWS_PRODUCT_DATA: IHeadingToText = { body: <Rating rating={itemRating ?? 0} numberOfReviews={itemReviews ?? 0} hasStar /> }

    const processData: IHeadingToText[] = [
        COUNTRY_PRODUCT_DATA,
        STATUS_PRODUCT_DATA,
        WAREHOUSES_PRODUCT_DATA,
        DESCRIPTION_PRODUCT_DATA
    ]

    if (isCreatedAtAndReviews) {
        return [
            REVIEWS_PRODUCT_DATA,
            CREATED_AT_PRODUCT_DATA
        ].filter(it => it !== undefined) as IHeadingToText[]
    }
    return processData.filter(it => it !== undefined) as IHeadingToText[]
}

//1. проверяем, что пришло в characteristic: id элемента (number) или name элемента (string)
//2. если characteristic оказался number, то мы в list ищем по it соответствующий элемент
//3. если characteristic оказался string, то возвращаем characteristic

export const getCharacteristic = ({ characteristic, list }: IGetCharacteristic) => {
    const characteristicId = parseInt(characteristic)
    if (!isNaN(characteristicId)) {
        return list.find(it => it.id === characteristicId)?.name
    }
    return characteristic;
}


export const getDataHeadingToTextProductMainTable = ({ product, selectedCountry, selectedWeightUnit }: IGetDataHeadingToTextProductMainTable) => {

    const packageWidth = product.packagingWidth;
    const packageHeight = product.packagingHeight;
    const packagingLength = product.packagingLength;

    const productWeightQuantity = product.characteristics.weight;

    const vat = product.vat ? 'Облагается' : 'Не облагается'
    const certification = product.certification ? 'Да' : 'Нет'
    const testProbe = product.isHasTestProbe ? 'Да' : 'Нет'
    const customDesign = product.isCustomDesign ? 'Да' : 'Нет'
    const packageSizes = (packageWidth && packageHeight && packagingLength) && `${packageHeight} x ${packageWidth} x ${packagingLength}`
    const productWeight = productWeightQuantity && `${productWeightQuantity} ${selectedWeightUnit}`

    const processData = [
        { heading: 'Доставка', body: product.delivery },
        { heading: 'Условия оплаты', body: product.paymentConditions },
        { heading: 'Срок изготовления', body: product.deliveryTime },
        { heading: 'Тип упаковки', body: product.packageType },
        { heading: 'Размеры упаковки', body: packageSizes },
        { heading: 'Вес товара', body: productWeight },
        { heading: 'НДС', body: vat },
        { heading: 'Сертификация', body: certification },
        { heading: 'Тестовый пробник', body: testProbe },
        { heading: 'Индивидуальный дизайн', body: customDesign },
        { heading: 'Статус товара', body: product.status },
        { heading: 'Склады по городам', body: product.warehouses },
        { heading: 'Бренд', body: product.characteristics.brand },
        { heading: 'Страна', body: selectedCountry },
        { heading: 'Срок годности', body: product.characteristics.expirationDate },
        { heading: 'Пол', body: getCharacteristic({ characteristic: product.characteristics.gender, list: SEX_OPTIONS }) },
        { heading: 'Особенности', body: product.characteristics.features },
        { heading: 'Состав', body: product.characteristics.composition },
        { heading: 'Комплектация', body: product.characteristics.equipment },
    ]

    //1. если it.body - массив строк, то формируем из этого массива строку с элементами, разделенными запятой
    //2. если it.body - строка, возвращаем строку
    //3. в массиве [processData] избавляемся от элементом равных undefined
    return processData.map(it => {
        const body = Array.isArray(it.body) ? it.body.join(', ') : it.body;
        return getHeadingToText(it.heading, body);
    }).filter(item => item !== undefined) as IHeadingToText[];
}