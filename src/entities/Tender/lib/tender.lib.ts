import { ETenderType, ETenderTypeEn, ITender, ITenderAPI } from "../model/tender.model";

export const getTenderType = (tender: ITender | ITenderAPI) => tender?.hasOwnProperty('minOrderUnits') ?  ETenderType.SALE : ETenderType.PURCHASE;


export const toTenderType = (tenderType?: string) => {
    if (!tenderType) return

    const tenderTypeLower = tenderType.toLocaleLowerCase()
    if (tenderTypeLower === 'sale' || tenderTypeLower === 'продажа')
        return ETenderTypeEn.SALE
    
    if (tenderTypeLower === 'purchase' || tenderTypeLower === 'покупка')
        return ETenderTypeEn.PURCHASE
}

export const tenderTypeToEn = (tenderType: ETenderType) => {
    if (tenderType === ETenderType.PURCHASE)
        return 'Purchase'
    return 'Sale'
}

export const tenderTypeToRu = (tenderType: ETenderType | string) => {
    if (tenderType === ETenderType.PURCHASE || tenderType === 'Purchase')
        return 'Покупка'
    return 'Продажа'
}