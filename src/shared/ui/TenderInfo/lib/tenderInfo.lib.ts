import { getTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType, ICommonTender } from "@/entities/Tender/model/tender.model";
import { IHeadingToTextTender } from "@/shared/model/text.model";


export const getDataTenderInfo = (tender: ICommonTender) => {

    const tenderType = getTenderType(tender)

    const maximumBudget = tender.maximumBudget
    const quantity = tender.quantity
    const quantityUnit = tender.quantityUnits

    const minOrder = tender.minOrder
    const minOrderUnits = tender.minOrderUnits
    const price = tender.price
    const currency = tender.currency

    let processData: IHeadingToTextTender[] = [];

    tenderType === ETenderType.PURCHASE ? processData = [
        {
            heading: 'Максимальный бюджет', text: String(maximumBudget), unit: currency
        },
        {
            heading: 'Количество', text:  String(quantity), unit: quantityUnit ? quantityUnit : ''
        }
    ] : processData = [
        {
            heading: 'Минимальный заказ', text: String(minOrder), unit: minOrderUnits ? minOrderUnits : ''
        },
        {
            heading: 'Цена', text:  String(price), unit: currency
        }
    ]

    return processData.filter(it => it !== undefined) as IHeadingToTextTender[]

}