import { getTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType, ICommonTender } from "@/entities/Tender/model/tender.model";
import { getDate } from "@/shared/lib/dateTime.lib";
import { IHeadingToTextTender } from "@/shared/model/text.model";

export const getDataTenderInfo = (tender: ICommonTender, isCreatedAt?: boolean) => {    

    const tenderType = getTenderType(tender);

    const maximumBudget = tender.maximumBudget;
    const quantity = tender.quantity;
    const quantityUnit = tender.quantityUnits?.shortName;

    const minOrder = tender.minOrder;
    const minOrderUnits = tender.minOrderUnits?.shortName;
    const price = tender.price;
    const currency = tender.currency.code ?? '';

    const CREATED_AT_TENDER_DATA = {
        heading: 'От', text: getDate(tender.createdAt), unit: ''
    }
    
    //PURCHASE
    const MAXIMUM_BUDGET_TENDER_DATA = {
        heading: 'Максимальный бюджет', text: String(maximumBudget), unit: currency
    }

    const QUANTITY_TENDER_DATA = {
        heading: 'Количество', text:  String(quantity), unit: quantityUnit ? quantityUnit : ''
    }

    //SALE
    const PRICE_TENDER_DATA = {
        heading: 'Цена', text:  String(price), unit: currency
    }

    const MIN_ORDER_DATA = {
        heading: 'Минимальный заказ', text: String(minOrder), unit: minOrderUnits ? minOrderUnits : ''
    }

    let processData: IHeadingToTextTender[] = [];

    tenderType === ETenderType.PURCHASE ? processData = [
        MAXIMUM_BUDGET_TENDER_DATA,
        QUANTITY_TENDER_DATA
    ] : processData = [
        PRICE_TENDER_DATA,
        MIN_ORDER_DATA 
    ]
    if(isCreatedAt){
        return [
            CREATED_AT_TENDER_DATA
        ].filter(it => it !== undefined) as IHeadingToTextTender[]
    }
    return processData.filter(it => it !== undefined) as IHeadingToTextTender[]

}