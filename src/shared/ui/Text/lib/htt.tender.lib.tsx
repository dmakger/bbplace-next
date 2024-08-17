import { getTenderType } from "@/entities/Tender/lib/tender.lib";
import { ETenderType } from "@/entities/Tender/model/tender.model";
import { dateToString } from "@/shared/lib/dateTime.lib";
import { IGetDataTenderInfo, IHeadingToText } from "@/shared/model/text.model";
import { InfoItem } from "../../InfoItem";
import { CreatedAt } from "../../CreatedAt";


export const getDataTenderInfo = ({
    tender,
    isCreatedAt
}: IGetDataTenderInfo) => {

    const tenderType = getTenderType(tender);

    const maximumBudget = tender.maximumBudget;
    const quantity = tender.quantity;
    const quantityUnit = tender.quantityUnits?.shortName;

    const minOrder = tender.minOrder;
    const minOrderUnits = tender.minOrderUnits?.shortName;
    const price = tender.price;
    const currency = tender.currency?.code ?? '';

    const CREATED_AT_TENDER_DATA = {
        body: <InfoItem body={<p>{dateToString(tender.createdAt)}</p>} heading="От:"/>}


    //PURCHASE
    const MAXIMUM_BUDGET_TENDER_DATA = {
        heading: 'Максимальный бюджет', body: String(maximumBudget), unit: currency
    }

    const QUANTITY_TENDER_DATA = {
        heading: 'Количество', body: String(quantity), unit: quantityUnit ? quantityUnit : ''
    }

    //SALE
    const PRICE_TENDER_DATA = {
        heading: 'Цена', body: String(price), unit: currency
    }

    const MIN_ORDER_DATA = {
        heading: 'Минимальный заказ', body: String(minOrder), unit: minOrderUnits ? minOrderUnits : ''
    }

    let processData: IHeadingToText[] = [];

    tenderType === ETenderType.PURCHASE ? processData = [
        MAXIMUM_BUDGET_TENDER_DATA,
        QUANTITY_TENDER_DATA
    ] : processData = [
        PRICE_TENDER_DATA,
        MIN_ORDER_DATA
    ]
    if (isCreatedAt) {
        return [
            CREATED_AT_TENDER_DATA
        ].filter(it => it !== undefined) as IHeadingToText[]
    }
    return processData.filter(it => it !== undefined) as IHeadingToText[]

}