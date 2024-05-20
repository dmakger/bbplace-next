import { getTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType, ICommonTender } from "@/entities/Tender/model/tender.model";
import { getDate } from "@/shared/lib/dateTime.lib";
import { IHeadingToTextTender } from "@/shared/model/text.model";

export const getDataTenderInfo = (tender: ICommonTender, isCreatedAt?: boolean) => {    

    const tenderType = getTenderType(tender)

    const createdAtOption = {
        heading: 'Опубликовано', text: getDate(tender.createdAt), unit: ''
    };

    const maximumBudget = tender.maximumBudget
    const quantity = tender.quantity
    const quantityUnit = tender.quantityUnits?.shortName

    const minOrder = tender.minOrder
    const minOrderUnits = tender.minOrderUnits?.shortName
    const price = tender.price
    const currency = tender.currency.code

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
            heading: 'Цена', text:  String(price), unit: currency
        },
        {
            heading: 'Минимальный заказ', text: String(minOrder), unit: minOrderUnits ? minOrderUnits : ''
        } 
    ]
    if(isCreatedAt){
        return [
            createdAtOption
        ].filter(it => it !== undefined) as IHeadingToTextTender[]
    }
    return processData.filter(it => it !== undefined) as IHeadingToTextTender[]

}